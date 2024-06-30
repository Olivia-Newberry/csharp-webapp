import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    if (profile.userName === userStore.user?.userName) return null;

    function handleFollow(e: SyntheticEvent) {
        e.preventDefault();
        updateFollowing(profile.userName, !profile.following);
    }

    return (
        <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                    fluid
                    primary={!profile.following}
                    color='teal'
                    content={profile.following ? 'Following' : profile.followedBy ? 'Follow Back' : 'Not Following'}
                    loading={loading}
                />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
                <Button
                    fluid
                    basic
                    animated='fade'
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading}
                    onClick={(e) => handleFollow(e)}
                />
            </Reveal.Content>
        </Reveal>
    )

})