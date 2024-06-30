import { Button, Icon, Image, Item, Label, Popup, PopupContent, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import ProfileCard from "../../profiles/ProfileCard";
import { observer } from "mobx-react-lite";

interface Props {
    activity: Activity
}

export default observer(function ActivityListItem({ activity }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled && (
                    <Label attached="top" color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                )}
                <Item.Group>
                    <Item>
                        {
                            <Popup
                                hoverable
                                key={`${activity.host?.userName}`}
                                trigger={
                                    <Image
                                        style={{ marginBottom: 3 }}
                                        as={Link} to={`/profile/${activity.host?.userName}`}
                                        size='tiny'
                                        circular
                                        src={activity.host?.image || '/assets/user.png'}
                                    />
                                }
                            >
                                <PopupContent>
                                    <ProfileCard profile={activity.host!} />
                                </PopupContent>
                            </Popup>
                        }
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`} >
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profile/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee activity={activity} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
                <Label basic content={activity.category} />
            </Segment>
        </Segment.Group>
    )
})