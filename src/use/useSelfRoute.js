import { useRoute, useRouter } from 'vue-router';

function useSelfRoute() {
  const Route = useRoute();
  const query = Route.query;
  const params = Route.params;
  return {
    Route,
    query,
    params,
  }
}
function useSelfRouter() {
  const Router = useRouter();
  return {
    Router,
  }
}

export {
  useSelfRoute,
  useSelfRouter,
}
