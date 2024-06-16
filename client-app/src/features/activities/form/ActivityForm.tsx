import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const {
        selectedActivity,
        closeForm,
        createActivity,
        updateActivity,
        loading,
    } = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input value={activity.title} name='title' placeholder='Title' onChange={handleInputChange} />
                <Form.TextArea value={activity.description} name='description' placeholder='Description' onChange={handleInputChange} />
                <Form.Input value={activity.category} name='category' placeholder='Category' onChange={handleInputChange} />
                <Form.Input value={activity.date} type="date" name='date' placeholder='Date' onChange={handleInputChange} />
                <Form.Input value={activity.city} name='city' placeholder='City' onChange={handleInputChange} />
                <Form.Input value={activity.venue} name='venue' placeholder='Venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})