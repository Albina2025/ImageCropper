import React from "react";
import AvatarUpload from "./AvatarUpload";

const Profile: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <span> Редактировать профиль</span>
      </div>

    <div 
        style={{ 
            display: "flex", 
            justifyContent: "space-between",  
            alignItems: "center" 
        }}>
            
        <h3>Личные данные</h3>

        <AvatarUpload size={91} />
    </div>
      
    </div>
  );
};

export default Profile;
