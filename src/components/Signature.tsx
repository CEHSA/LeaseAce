import React, { useRef, useEffect, useState } from 'react'
import { getFormattedLocation, requestLocationPermission } from '../utils/location'
import { signaturePlaceholders } from '../constants/formPlaceholders'

interface SignatureProps {
  updateData: (data: {
    lessorSignature: string;
    lessorDate: string;
    lessorLocation: string;
    lesseeSignature: string;
    lesseeDate: string;
    lesseeLocation: string;
    lessorFormattedLocation: string;
    lesseeFormattedLocation: string;
  }) => void;
  data: {
    lessorSignature: string;
    lessorDate: string;
    lessorLocation: string;
    lesseeSignature: string;
    lesseeDate: string;
    lesseeLocation: string;
    lessorFormattedLocation: string;
    lesseeFormattedLocation: string;
  };
  requireLocation?: boolean;
}

interface SignaturePoint {
  x: number;
  y: number;
  time: number;
  pressure?: number;
}

interface SignaturePadData {
  points: SignaturePoint[];
}

interface SignaturePadOptions {
  backgroundColor: string;
  penColor?: string;
  velocityFilterWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  throttle?: number;
  minDistance?: number;
}

interface SignaturePadInstance {
  clear: () => void;
  isEmpty: () => boolean;
  off: () => void;
  on: () => void;
  fromData: (data: SignaturePadData[]) => void;
  toData: () => SignaturePadData[];
  fromDataURL: (dataUrl: string) => void;
  toDataURL: (type?: string) => string;
}

declare global {
  const SignaturePad: {
    new (canvas: HTMLCanvasElement, options?: SignaturePadOptions): SignaturePadInstance;
  };
}

// Default lessor signature image
const defaultLessorSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTVVACBAyWHxAgkBEwWJmqghIgYLD8gACBjIDBylQVlAABg+UHBAhkBAxWpqqgBAgYLD8gQCAjYLAyVQUlQMBg+QEBAhkBg5WpKigBAgbLDwgQyAgYrExVQQkQMFh+QIBARsBgZaoKSoCAwfIDAgQyAgYrU1VQAgQMlh8QIJARMFiZqoISIGCw/IAAgYyAwcpUFZQAAYPlBwQIZAQMVqaqoAQIGCw/IEAgI2CwMlUFJUDAYPkBAQIZAYOVqSooAQIGyw8IEMgIGKxMVUEJEDBYfkCAQEbAYGWqCkqAgMHyAwIEMgIGK1NVUAIEDJYfECCQETBYmaqCEiBgsPyAAIGMgMHKVBWUAAGD5QcECGQEDFamqqAECBgsPyBAICNgsDJVBSVAwGD5AQECGQGDlakqKAECBssPCBDICBisTFVBCRAwWH5AgEBGwGBlqgpKgIDB8gMCBDICBitTVVACBAyWHxAgkBEwWJmqghIgYLD8gACBjIDBylQVlAABg+UHBAhkBB4FXAAE/yWPCwAAAABJRU5ErkJggg==';

const Signature = ({ updateData, data }: SignatureProps) => {
  const lessorPadRef = useRef<SignaturePadInstance | null>(null)
  const lesseePadRef = useRef<SignaturePadInstance | null>(null)
  const lessorCanvasRef = useRef<HTMLCanvasElement>(null)
  const lesseeCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    try {
      const parent = canvas.parentElement;
      if (!parent) return;

      // Get the display size of the canvas
      const rect = parent.getBoundingClientRect();
      const width = rect.width - 4; // Account for borders
      const height = 200;

      // Set the canvas size for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Set the display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale the context for high DPI displays
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      console.log('Canvas setup complete:', { width, height, dpr });
    } catch (error) {
      console.error('Error setting up canvas:', error);
    }
  };

  useEffect(() => {
    const initPad = async () => {
      try {
        // Request location permission first
        setIsLoadingLocation(true);
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setLocationError('Location access is required to continue');
          return;
        }

        // Get location
        const locationResult = await getFormattedLocation();
        if (!locationResult.success) {
          setLocationError(locationResult.error || 'Failed to get location');
          return;
        }

        // Update both regular and formatted locations
        const formattedAddress = locationResult.address || 'Location not available';
        updateData({
          ...data,
          lessorLocation: formattedAddress,
          lesseeLocation: formattedAddress,
          lessorFormattedLocation: formattedAddress,
          lesseeFormattedLocation: formattedAddress
        });

        // Wait for SignaturePad to be available
        if (typeof SignaturePad === 'undefined') {
          console.log('Loading SignaturePad...');
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js';
          script.async = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          console.log('SignaturePad loaded');
        }

        // Initialize canvases
        if (lessorCanvasRef.current) {
          console.log('Setting up lessor canvas');
          setupCanvas(lessorCanvasRef.current);
          lessorPadRef.current = new SignaturePad(lessorCanvasRef.current, {
            backgroundColor: 'rgb(249, 250, 251)'
          });
          // Load default lessor signature
          lessorPadRef.current.fromDataURL(data.lessorSignature || defaultLessorSignature);
          // Make it read-only by disabling events but keeping the signature visible
          lessorPadRef.current.off();
        }

        if (lesseeCanvasRef.current) {
          console.log('Setting up lessee canvas');
          setupCanvas(lesseeCanvasRef.current);
          lesseePadRef.current = new SignaturePad(lesseeCanvasRef.current, {
            backgroundColor: 'rgb(255, 255, 255)'
          });

          // Add event listeners
          const handleSignatureEnd = () => {
            if (lesseePadRef.current && !lesseePadRef.current.isEmpty()) {
              console.log('Capturing lessee signature');
              updateData({
                ...data,
                lesseeSignature: lesseePadRef.current.toDataURL()
              });
            }
          };

          lesseeCanvasRef.current.addEventListener('pointerup', handleSignatureEnd);
          lesseeCanvasRef.current.addEventListener('touchend', handleSignatureEnd);
        }

        // Restore lessee signature if it exists
        if (data.lesseeSignature && lesseePadRef.current) {
          lesseePadRef.current.fromDataURL(data.lesseeSignature);
        }

      } catch (error) {
        console.error('Error initializing signature pads:', error);
        setLocationError('Failed to initialize signature pads');
      } finally {
        setIsLoadingLocation(false);
      }
    };

    initPad();

    // Handle window resize
    const handleResize = () => {
      try {
        if (lessorCanvasRef.current && lessorPadRef.current) {
          const data = lessorPadRef.current.toData();
          setupCanvas(lessorCanvasRef.current);
          lessorPadRef.current.fromData(data);
        }
        if (lesseeCanvasRef.current && lesseePadRef.current) {
          const data = lesseePadRef.current.toData();
          setupCanvas(lesseeCanvasRef.current);
          lesseePadRef.current.fromData(data);
        }
      } catch (error) {
        console.error('Error handling resize:', error);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (lessorPadRef.current) lessorPadRef.current.off();
      if (lesseePadRef.current) lesseePadRef.current.off();
    };
  }, [data, updateData]);

  const clearSignature = (type: 'lessor' | 'lessee') => {
    try {
      const pad = type === 'lessor' ? lessorPadRef.current : lesseePadRef.current;
      if (pad) {
        pad.clear();
        updateData({
          ...data,
          [type === 'lessor' ? 'lessorSignature' : 'lesseeSignature']: ''
        });
      }
    } catch (error) {
      console.error('Error clearing signature:', error);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  if (isLoadingLocation) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E67E22]"></div>
        <p className="mt-4 text-[#2C3E50]">Getting your location...</p>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          <p className="font-medium">Location Access Required</p>
          <p className="mt-2">{locationError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Lessor Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SIGNED BY LESSOR ON</label>
            <input
              type="date"
              value={data.lessorDate || currentDate}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LOCATION</label>
            <input
              type="text"
              value={data.lessorLocation}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-50"
              required
              title="Location access is required to proceed"
            />
          </div>
        </div>
        <div className="border-2 border-gray-300 rounded-md p-2">
          <canvas
            ref={lessorCanvasRef}
            className="border border-gray-300 rounded bg-gray-50 w-full"
            style={{ touchAction: 'none', height: '200px' }}
          />
        </div>
        <p className="text-sm text-gray-500 italic">(SIGNATURE OF LESSOR)</p>
      </div>

      {/* Lessee Section */}
        <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <label className="block text-sm font-medium text-gray-700">SIGNED BY LESSEE ON</label>
          <input
            type="date"
            value={data.lesseeDate}
            onChange={(e) => updateData({ ...data, lesseeDate: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            required
          />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">LOCATION</label>
          <input
            type="text"
            value={data.lesseeLocation}
            onChange={(e) => updateData({ ...data, lesseeLocation: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            required
            title="Location access is required to proceed"
          />
          </div>
        </div>
        <div className="border-2 border-gray-300 rounded-md p-2">
          <canvas
            ref={lesseeCanvasRef}
            className="border border-gray-300 rounded cursor-crosshair w-full"
            style={{ touchAction: 'none', height: '200px' }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 italic">(SIGNATURE OF LESSEE)</p>
          <button
            onClick={() => clearSignature('lessee')}
            className="text-sm text-orange-500 hover:text-gray-700"
            type="button"
          >
            Clear Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signature;
