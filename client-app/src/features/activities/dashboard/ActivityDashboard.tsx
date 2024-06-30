import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;

    function handleGetNext() {
        setPagingParams(new PagingParams({ pageNumber: pagination!.currentPage + 1 }));
        loadActivities();
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities()
    }, [loadActivities, activityRegistry.size]);

    return (
        <Grid>
            <Grid.Column width='10'>
                {activityStore.loadingInitial || activityRegistry.size === 0 && activityStore.loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!activityStore.loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader active={activityStore.loadingNext} />
                <ActivityListItemPlaceholder active={activityStore.loadingInitial || activityStore.loadingNext} />
            </Grid.Column>
        </Grid>
    );
})