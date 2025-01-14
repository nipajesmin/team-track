const Features = () => {
    const features = [
      {
        title: "Workflow Management",
        description: "Easily track and manage employee workflows in real-time.",
      },
      {
        title: "Payroll Integration",
        description: "Seamlessly handle payroll and payments with just a few clicks.",
      },
      {
        title: "Performance Tracking",
        description: "Monitor employee performance and productivity effectively.",
      },
      {
        title: "Secure Data Storage",
        description: "Keep all employee and company data safe with our secure platform.",
      },
    ];
  
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Features
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Discover the features that make TeamTrack the best choice for your team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  