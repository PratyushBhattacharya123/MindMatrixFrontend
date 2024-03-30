import Image from "next/image";
import React, { useEffect, useState } from "react";
import AvatarIcon from "../../../public/Avatar.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

interface PropfileInfoProps {
  avatar: string | null;
  user: any;
}

const ProfileInfo: React.FC<PropfileInfoProps> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [
    editProfile,
    { isSuccess: profileUpdateSuccess, error: profileUpdateError, isLoading },
  ] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        console.log(avatar);
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || profileUpdateSuccess) {
      setLoadUser(true);
    }
    if (error) {
      toast.error("Failed to Upload Image");
      console.log(error);
    }
    if (profileUpdateError) {
      toast.error("Failed to update name!");
      console.log(error);
    }
    if (profileUpdateSuccess) {
      toast.success("Profile Updated Successfully!");
    }
  }, [isSuccess, error, profileUpdateSuccess, profileUpdateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  console.log(user);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : AvatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <Input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <Label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1 text-white" />
            </div>
          </Label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 md:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <Label className="block">Full Name</Label>
              <Input
                type="text"
                className={`${styles.input} !w-[95%] mb-4`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%]">
              <Label className="block">Email Address</Label>
              <Input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-2`}
                required
                value={user?.email}
              />
            </div>
            <Input
              type="submit"
              className="w-[95%] md:w-[250px] h-[40px] flex items-center justify-center text-center dark:text-[#fff] text-black rounded-[6px] mt-8 cursor-pointer bg-gradient-to-r dark:from-slate-300/70 dark:to-slate-500/70 font-semibold from-gray-300/30 to-gray-900/50"
              required
              value="Update"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
