import { useState, useRef, useEffect } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setIsScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const captureImage = () => {
    if (!videoRef.current) {
      toast.error('Video not ready');
      return;
    }

    const video = videoRef.current;
    
    // Check if video is ready
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      toast.error('Please wait for camera to fully load');
      return;
    }

    // Verify video has valid dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast.error('Camera not ready, please try again');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      toast.error('Failed to create canvas context');
      return;
    }

    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get the image data
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    // Validate the image data
    if (imageData === 'data:,' || imageData.length < 100) {
      toast.error('Failed to capture image, please try again');
      return;
    }

    console.log('Image captured successfully, size:', imageData.length);
    setCapturedImage(imageData);
    stopCamera();
    analyzeImage(imageData);
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysis('');

    try {
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { imageBase64: imageData }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setAnalysis('');
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
            Web Scanner
          </h1>
          <p className="text-lg text-muted-foreground">
            Point your camera at any object or place to get instant information
          </p>
        </div>

        <Card className="glass p-6 mb-6">
          <div className="relative aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-4">
            {!isScanning && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Ready to scan</p>
                </div>
              </div>
            )}

            {isScanning && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {!isScanning && !capturedImage && (
              <Button onClick={startCamera} size="lg" variant="hero">
                <Camera className="mr-2" />
                Start Camera
              </Button>
            )}

            {isScanning && (
              <>
                <Button onClick={captureImage} size="lg" variant="hero">
                  Capture & Analyze
                </Button>
                <Button onClick={stopCamera} size="lg" variant="outline">
                  <X className="mr-2" />
                  Cancel
                </Button>
              </>
            )}

            {capturedImage && (
              <Button onClick={reset} size="lg" variant="accent">
                Scan Again
              </Button>
            )}
          </div>
        </Card>

        {isAnalyzing && (
          <Card className="glass p-6">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-lg">Analyzing image...</p>
            </div>
          </Card>
        )}

        {analysis && !isAnalyzing && (
          <Card className="glass p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-primary">Analysis Results</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
