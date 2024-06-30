import { Card, Grid, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
    function truncate(str: string | undefined) {
        if (str) {
            return str.length > 40 ? str.substring(0, 37) + '...' : str;
        }
    }

    return (
        <Card as={Link} to={`/profile/${profile.userName}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <FollowButton profile={profile} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio || 'This user does not have a bio yet.')}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                {profile.followersCount} Follower{profile.followersCount === 1 ? '' : 's'}
            </Card.Content>
        </Card>
    )
})