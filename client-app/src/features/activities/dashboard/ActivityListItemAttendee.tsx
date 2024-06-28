import { observer } from "mobx-react-lite";
import { Image, List, Popup, PopupContent } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
}

export default observer(function ActivityListItemAttendee({ activity }: Props) {
    var attendees = activity.attendees.filter(function (attendee) {
        if (attendee.userName == activity.host?.userName) {
            return false;
        }
        return true;
    })
    return (
        attendees.length > 0 ? <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={`${attendee.userName}`}
                    trigger={
                        <List.Item as={Link} to={`/profile/${attendee.userName}`}>
                            <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <PopupContent>
                        <ProfileCard profile={attendee} />
                    </PopupContent>
                </Popup>
            ))}
        </List> : <span>
            {activity.isHost ? 'Encourage others to join!' : 'Be the first to join!'}
        </span>
    )
})