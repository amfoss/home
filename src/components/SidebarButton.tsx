import React from 'react';

type SideBarButtonProps = {
  icon?: React.ReactElement;
  text: string;
  onClick: (text: string) => void;
};

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, text, onClick }) => {
  return (
    <div
      className="lg:flex justify-center items-center max-w-full bg-panelButtonColor p-5 rounded-none sm:rounded-md md:rounded-xl text-white overflow-hidden cursor-pointer transition-colors duration-500"
      onClick={() => onClick(text)}
      title={text}
    >
      {/* Icon container */}
      <div className="flex-3 flex items-center justify-center z-20">
        {icon && React.cloneElement(icon, {
          className: "text-offWhite group-hover:text-primaryYellow transition-colors duration-300"
        })}
      </div>

      {/* Text container */}
      <div className="flex-1 flex items-center justify-center z-20">
        <div className="text-base lg:text-lg hidden md:block">{text}</div>
      </div>
    </div>
  );
};

export default SideBarButton;
