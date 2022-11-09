export default defineNuxtRouteMiddleware( (to) => {
    console.log('middleware')
    const user =  useSupabaseUser();
    console.log(user.value, !user.value)
    console.log(to.path, to?.path?.includes('admin'))
  
    if (!user.value && to.path?.includes('admin')) {
      console.log('hey')
      return navigateTo('/login');
    } else if (user.value && to.path === '/login') {
      console.log('ho')
      return navigateTo('/admin');
    }

    console.log('netither')
    navigateTo(to)
  });
  