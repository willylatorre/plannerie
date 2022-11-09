export default defineNuxtRouteMiddleware( (to) => {
    const user =  useSupabaseUser();
  
    if (!user.value && to.path?.includes('admin')) {
      return navigateTo('/login');
    }

    return true
  });
  