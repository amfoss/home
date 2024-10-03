import React from 'react';

interface SidePanelButtonProps {
  icon: React.ReactElement; 
  text: string;
}

const SidePanelButton: React.FC<SidePanelButtonProps> = ({ icon, text }) => {
  return (
    <div className="flex p-5 items-center justify-center h-20 rounded-xl w-full bg-panelButtonColor cursor-pointer hover:bg-hoverPanelButtonColor hover:text-primaryYellow transition-colors duration-300 group">
      <div className="flex-3 flex items-center justify-center"> 
        {React.cloneElement(icon, {
          className: "text-offWhite group-hover:text-primaryYellow transition-colors duration-300"
        })}
      </div>
      <div className="flex-1 flex items-center justify-center"> 
        <span className="text-lg">{text}</span>
      </div>
    </div>
  );
};

export default SidePanelButton;
