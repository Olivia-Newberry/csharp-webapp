import { Segment, List, Label, Item, Image, Popup, PopupContent } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
    if (!attendees) return null;

    function followingInfo(attendee: Profile) {
        if (attendee.following) {
            return <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
        }
        if (attendee.followedBy) {
            return <Item.Extra style={{ color: 'orange' }}>Follows You</Item.Extra>
        }
        return null;
    }

    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Popup
                            hoverable
                            key={attendee.userName}
                            size='mini'
                            position='right center'
                            trigger={
                                <Item style={{ position: 'relative' }} key={attendee.userName}>
                                    {attendee.userName === host?.userName &&
                                        <Label
                                            style={{ position: 'absolute' }}
                                            color='orange'
                                            ribbon='right'
                                        >
                                            Host
                                        </Label>
                                    }
                                    <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header as='h3'>
                                            <Link to={`/profile/${attendee.userName}`}>{attendee.displayName}</Link>
                                        </Item.Header>
                                        {followingInfo(attendee)}
                                    </Item.Content>
                                </Item>
                            }
                        >
                            <PopupContent>
                                <ProfileCard profile={attendee} />
                            </PopupContent>
                        </Popup>
                    ))}
                </List>
            </Segment>
        </>

    )
})
