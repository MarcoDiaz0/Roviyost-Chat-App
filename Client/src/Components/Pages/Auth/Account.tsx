import { MdCameraAlt, MdCheck, MdEdit, MdPerson } from "react-icons/md";
import { useAuthStore } from "../../Store/Auth";
import Button from "../../Common/Button";
import { useState } from "react";
import type { profileData } from "../../../types";
import FileButton from "../../Common/FileButton";
//Todo Change Password ,Member Since
const Account = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const btn = " btn btn-primary";
  const btnStyle = "p-2 w-full";
  const [editMode, setEditMode] = useState({ username: false, bio: false });

  const themes = [
    "light",
    "dark",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];
  const [currentTheme, setCurrentTheme] = useState("light");

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
  };
  const [part, setPart] = useState("Account");
  const [formData, setFormData] = useState<profileData>({
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    profilePicture: authUser?.profilePicture || "",
  });
  const update = () => {
    updateProfile(formData);
    setEditMode({ username: false, bio: false });
    setFormData({
      username: authUser?.username || "",
      bio: authUser?.bio || "",
      profilePicture: authUser?.profilePicture || "",
    });
  };
  return (
    <article className="flex flex-col overflow-scroll items-center justify-center">
      <h1 className="text-5xl m-4">Account Managment</h1>
      <aside className="lg:w-2/3 p-2 grid grid-cols-4 border ">
        <section className=" flex flex-col ">
          <div className="flex flex-col items-center w-full py-3">
            {authUser?.profilePicture ? (
              <img
                src={
                  formData?.profilePicture instanceof File
                    ? URL.createObjectURL(formData.profilePicture)
                    : authUser?.profilePicture
                }
                className=" w-24 h-full  border-2 object-cover rounded-full aspect-square"
              />
            ) : (
              <MdPerson className=" w-24 h-full border-2 object-cover rounded-full" />
            )}
            {formData?.profilePicture instanceof File ? (
              <Button
                onClick={update}
                className="flex btn btn-neutral items-center  justify-center rounded-2xl m-2 gap-1"
              >
                {isUpdatingProfile ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <>
                    Confirm <MdCheck />
                  </>
                )}
              </Button>
            ) : (
              <FileButton
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({
                      ...formData,
                      profilePicture: file,
                    });
                  }
                }}
                type="image/*"
                className=" justify-items-center hover:scale-105 m-2  flex justify-center items-center duration-300"
              >
                <p className="flex btn btn-neutral items-center justify-center rounded-2xl gap-1">
                  {isUpdatingProfile ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <>
                      Update
                      <MdCameraAlt className="w-6 h-6" />
                    </>
                  )}
                </p>
              </FileButton>
            )}
            <hr className="my-2 w-full" />
          </div>

          <nav className="w-full">
            <Button
              onClick={() => setPart("Account")}
              className={`${part == "Account" && btn} ${btnStyle}`}
            >
              Account
            </Button>
            <Button
              onClick={() => setPart("Themes")}
              className={`${part == "Themes" && btn} ${btnStyle}`}
            >
              Themes
            </Button>
          </nav>
        </section>
        <section className="col-span-3 self-start ">
          {part == "Account" && (
            <div className="  grid grid-cols-2">
              <aside className="p-2 flex flex-col gap-3">
                <div>
                  <h1 className="block  text-lg  font-medium">Username:</h1>
                  {editMode.username ? (
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        value={formData.username}
                        className="w-full px-3 py-2  border-b-2   duration-500 relative outline-none"
                      />

                      <span
                        onClick={() => update()}
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                      >
                        <MdCheck className="w-5 h-5" />
                      </span>
                    </div>
                  ) : (
                    <p className="w-full px-3 py-2  border-b-2  duration-500 relative outline-none">
                      {authUser?.username}
                      <span
                        onClick={() =>
                          setEditMode((em) => ({ ...em, username: true }))
                        }
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                      >
                        <MdEdit className="w-5 h-5" />
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <h1 className="block  text-lg  font-medium">Email:</h1>
                  <p className="w-full px-3 py-2  border-b-2  duration-500  outline-none">
                    {authUser?.email}
                  </p>
                </div>
              </aside>
              <aside className="p-2 flex flex-col gap-3">
                <div>
                  <h1 className="block  text-lg  font-medium">
                    Account Status:
                  </h1>
                  <p className="w-full px-3 py-2  border-b-2  duration-500  outline-none">
                    Active
                  </p>
                </div>
                <div>
                  <h1 className="block text-lg font-medium">Member Since:</h1>
                  <p className="w-full px-3 py-2  border-b-2  duration-500  outline-none">
                    10/01/2001
                  </p>
                </div>
              </aside>
              <aside className="col-span-2 px-2 relative">
                <h1 className="block text-lg font-medium">Bio:</h1>
                {editMode.bio ? (
                  <div className="relative">
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className={`border textarea max-h-fit duration-500   text-center w-full `}
                      id=""
                    ></textarea>
                    <span
                      onClick={() => update()}
                      className="absolute  right-2 top-2"
                    >
                      <MdCheck className="w-5 h-5" />
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <span
                      onClick={() =>
                        setEditMode((em) => ({ ...em, bio: true }))
                      }
                      className="absolute  right-2 top-2"
                    >
                      <MdEdit className="w-5 h-5" />
                    </span>
                    <p
                      className={`border textarea max-h-fit duration-500   text-center w-full `}
                    >
                      {authUser?.bio}
                    </p>
                  </div>
                )}
              </aside>
            </div>
          )}
          {part == "Themes" && (
            <div className="grid grid-cols-4   p-2">
              {themes.map((theme) => (
                <button
                  key={theme}
                  className={`bg-primary btn m-2 rounded-md relative flex flex-col border ${
                    currentTheme === theme ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => changeTheme(theme)}
                  data-theme={theme}
                >
                  <p className="relative  text-center ">{theme}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </aside>
    </article>
  );
};

export default Account;
