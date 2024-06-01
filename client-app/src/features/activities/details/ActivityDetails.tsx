import { Image, Button, Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button basic onClick={() => openForm(activity.id)} color='blue' content='Edit' />
                    <Button basic onClick={cancelSelectActivity} color='grey' content='Cancel' />
                </Button.Group>
            </CardContent>
        </Card>
    );
}