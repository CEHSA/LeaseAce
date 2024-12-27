const LessorDetails = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#003976]">Lessor Details</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-[#2C3E50] space-y-4">
        <div>
          <span className="text-[#2C3E50] font-medium">Name:</span>
          <span className="text-[#2C3E50] ml-2">AAA Student Rentals</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Registration No:</span>
          <span className="text-[#2C3E50] ml-2">2024/339166/07</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Physical Address:</span>
          <span className="text-[#2C3E50] ml-2">Potchefstroom, North West</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Email:</span>
          <span className="text-[#2C3E50] ml-2">aaa.student.rentals@gmail.com</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Telephone/Cell No:</span>
          <span className="text-[#2C3E50] ml-2">+27 76 848 3419</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-[#003976] mt-8">Banking Details</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-[#2C3E50] space-y-4">
        <div>
          <span className="text-[#2C3E50] font-medium">Bank:</span>
          <span className="text-[#2C3E50] ml-2">FNB</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Account Holder:</span>
          <span className="text-[#2C3E50] ml-2">AAA Student Rentals</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Account Number:</span>
          <span className="text-[#2C3E50] ml-2">63103816885</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Branch Code:</span>
          <span className="text-[#2C3E50] ml-2">250655</span>
        </div>

        <div>
          <span className="text-[#2C3E50] font-medium">Reference:</span>
          <span className="text-[#2C3E50] ml-2">Student Name & Room Number</span>
        </div>
      </div>
    </div>
  );
};

export default LessorDetails;
