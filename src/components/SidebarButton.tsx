import React from 'react';

type SideBarButtonProps = {
  icon?: React.ReactElement;
  text: string;
  onClick: (text: string) => void;
};

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, text, onClick }) => {
  return (
    <div
      className="flex md:flex-col items-center md:items-center w-full bg-panelButtonColor p-4 md:p-3 rounded-lg text-white cursor-pointer hover:bg-primaryYellow hover:bg-opacity-20 active:bg-primaryYellow active:bg-opacity-30 transition-all duration-300"
      onClick={() => onClick(text)}
      title={text}
    >
      {/* Icon container */}
      <div className="flex items-center justify-center">
        {icon && React.cloneElement(icon, {
          className: "text-offWhite w-6 h-6 hover:text-primaryYellow transition-colors duration-300"
        })}
      </div>

      {/* Text container */}
      <div className="flex items-center ml-4 md:ml-0 md:mt-2">
        <div className="text-sm font-medium truncate">{text}</div>
      </div>
    </div>
  );
};

export default SideBarButton;
