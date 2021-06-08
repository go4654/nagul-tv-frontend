import { EditProfileAvatar } from "../components/editProfile/EditProfileAvatar";
import { MyProfile } from "../components/editProfile/MyProfile";
import { PageTitle } from "../components/PageTitle";
import { Section } from "../components/Section";
import { useMe } from "../hooks/useMe";

export const EditProfile = () => {
  const { data: userData } = useMe();

  return (
    <Section>
      <PageTitle title={"프로필 수정"} />

      <div className="flex justify-between mt-32">
        <EditProfileAvatar
          avatar={userData?.me.avatar}
          userName={userData?.me.userName}
          firstName={userData?.me.firstName}
        />

        <MyProfile />
      </div>
    </Section>
  );
};
