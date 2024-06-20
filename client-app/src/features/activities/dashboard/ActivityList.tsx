import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react/jsx-runtime";

export default function ActivityList() {
    const { groupedActivities } = useStore().activityStore;

    return (
        <>
        {groupedActivities.map(([group, activities]) => (
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
                {activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Fragment>
        ))}
        </>
    );
}