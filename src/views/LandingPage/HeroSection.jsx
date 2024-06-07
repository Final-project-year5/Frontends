import { aboutUs } from "./constants";

const HeroSection = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-center mt-6 tracking-wide">
        About{" "}
        <span className="bg-gradient-to-r from-blue-500 text-transparent bg-clip-text" style={{ color: '#6E82A7' }}>
          US
        </span>
      </h2>

      {aboutUs.map((section, index) => (
        <div key={index} className="my-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-4">
            {section.title}
          </h3>
          <p className="text-md ml-32 mr-12 text-neutral-500">{section.text}</p>
          {section.teamMembers && (
            <div className="flex flex-wrap justify-left mt-8">
              {section.teamMembers.map((member, idx) => (
                <div key={idx} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                  <div className="w-1/4 mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-auto rounded-full"
                    />
                  </div>
                  <h4 className="text-xl mt-4 text-center">{member.name}</h4>
                  <p className="text-md text-neutral-500 text-center">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default HeroSection;