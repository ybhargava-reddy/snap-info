import { useState, useRef, useEffect } from 'react';
import { Camera, X, Loader2, Upload, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const Scanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsVideoReady(false);
      
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Camera not supported in this browser or context');
        return;
      }

      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      
      console.log('Camera access granted');
      if (videoRef.current) {
        const video = videoRef.current;
        
        // Set event handler BEFORE setting srcObject
        video.onloadedmetadata = async () => {
          console.log('Video metadata loaded');
          try {
            await video.play();
            console.log('Video playing');
            setIsVideoReady(true);
          } catch (playError) {
            console.error('Error playing video:', playError);
            setIsVideoReady(true); // Still set ready even if autoplay fails
          }
        };
        
        video.srcObject = stream;
        streamRef.current = stream;
      }
      setIsScanning(true);
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      if (error.name === 'NotAllowedError') {
        toast.error('Camera access denied. Please allow camera permissions and try again.');
      } else if (error.name === 'NotFoundError') {
        toast.error('No camera found on this device.');
      } else {
        toast.error('Unable to access camera. Try uploading an image instead.');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = null;
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setIsVideoReady(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !isVideoReady) {
      toast.error('Please wait for camera to be ready');
      return;
    }

    const video = videoRef.current;
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
      console.log('Starting image analysis...');
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { imageBase64: imageData }
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data || !data.analysis) {
        throw new Error('No analysis data returned');
      }

      setAnalysis(data.analysis);
      toast.success('Analysis complete!');
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      toast.error(error?.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setAnalysis('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const readAloud = async () => {
    if (!analysis) return;

    try {
      setIsPlayingAudio(true);

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: analysis }
      });

      if (error) throw error;

      if (data.audioContent) {
        // Stop any currently playing audio
        if (audioRef.current) {
          audioRef.current.pause();
        }

        // Create new audio element
        const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
        audioRef.current = audio;

        audio.onended = () => {
          setIsPlayingAudio(false);
        };

        audio.onerror = () => {
          setIsPlayingAudio(false);
          toast.error('Failed to play audio');
        };

        await audio.play();
      }
    } catch (error: any) {
      console.error('Error reading aloud:', error);
      setIsPlayingAudio(false);
      toast.error(error?.message || 'Failed to generate speech');
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      analyzeImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        
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
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isVideoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 mx-auto mb-2 text-primary animate-spin" />
                      <p className="text-white">Loading camera...</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            {!isScanning && !capturedImage && (
              <>
                <Button onClick={startCamera} size="lg" variant="hero">
                  <Camera className="mr-2" />
                  Start Camera
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  size="lg" 
                  variant="accent"
                >
                  <Upload className="mr-2" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            )}

            {isScanning && (
              <>
                <Button 
                  onClick={captureImage} 
                  size="lg" 
                  variant="hero"
                  disabled={!isVideoReady}
                >
                  {isVideoReady ? 'Capture & Analyze' : 'Waiting for camera...'}
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-primary">Analysis Results</h2>
              {!isPlayingAudio ? (
                <Button
                  onClick={readAloud}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Volume2 className="h-4 w-4" />
                  Read Aloud
                </Button>
              ) : (
                <Button
                  onClick={stopAudio}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <VolumeX className="h-4 w-4" />
                  Stop
                </Button>
              )}
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
