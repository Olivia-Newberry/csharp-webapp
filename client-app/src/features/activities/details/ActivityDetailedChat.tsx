import { observer } from 'mobx-react-lite'
import { Segment, Header, Comment, Loader, Popup, PopupContent } from 'semantic-ui-react'
import { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import { format, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profile/${comment.userName}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <Popup
                                        hoverable
                                        key={`${comment.id} popup`}
                                        trigger={<div>{formatDistanceToNow(comment.createdAt)} ago</div>}
                                    >
                                        <PopupContent>
                                            {format(comment.createdAt!, 'dd MMM yyyy h:mm aa')}
                                        </PopupContent>
                                    </Popup>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik
                        onSubmit={(values, { resetForm }) =>
                            commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className='ui form'>
                                <Field name='body'>
                                    {(props: FieldProps) => (
                                        <div style={{ position: 'relative' }}>
                                            <Loader active={isSubmitting} />
                                            <textarea
                                                placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                                                rows={2}
                                                {...props.field}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.shiftKey) {
                                                        return;
                                                    }
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        isValid && handleSubmit();
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Comment.Group>
            </Segment>
        </>
    )
})
