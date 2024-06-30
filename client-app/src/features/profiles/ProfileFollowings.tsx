import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Card, Grid, Header, TabPane } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";

interface Props {
    predicate: string;
}

export default observer(function ProfileFollowings({ predicate }: Props) {
    const {
        profile,
        followings,
        loadFollowings,
        loadingFollowings,
    } = useStore().profileStore;

    useEffect(() => {
        loadFollowings(predicate);
        return () => {
            loadFollowings('');
        }
    }, [loadFollowings, predicate]);

    return (
        <TabPane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                    floated='left'
                    icon='user'
                    content={predicate === 'followers'
                        ? `People following ${profile?.displayName}`
                        : `People ${profile?.displayName} is following`}
                />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map((profile) => (
                            <ProfileCard key={profile.userName} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </TabPane>
    )
})