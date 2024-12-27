import React from 'react';

const CoverPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-[#2C3E50] mb-8">
          STANDARDISED FIXED-TERM LEASE AGREEMENT
        </h1>

        <div className="space-y-4">
          <p className="text-2xl text-[#2C3E50]">BETWEEN</p>
          
          <div className="text-xl font-semibold text-[#2C3E50] my-6">
            THE PRIVATE ACCOMMODATION PROVIDER<br/>
            ("LESSOR")
          </div>

          <p className="text-2xl text-[#2C3E50]">AND</p>

          <div className="text-xl font-semibold text-[#2C3E50] mt-6">
            THE NSFAS-FUNDED STUDENT<br/>
            ("LESSEE")
          </div>
        </div>
      </div>

      {/* Next Button Hint */}
      <div className="absolute bottom-4 right-4">
        <p className="text-sm text-[#2C3E50] mb-2">Click Next to proceed with the agreement</p>
      </div>
    </div>
  );
};

export default CoverPage;
