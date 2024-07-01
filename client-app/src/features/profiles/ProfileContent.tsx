import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

interface Props {
    profile: Profile | null;
}

export default observer(function ProfileContent({ profile }: Props) {
    const panes = [
        { menuItem: 'About', render: () => <ProfileAbout /> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <ProfileActivities /> },
        { menuItem: 'Followers', render: () => <ProfileFollowings predicate="followers" /> },
        { menuItem: 'Following', render: () => <ProfileFollowings predicate="following" /> },
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}

        />
    )
})