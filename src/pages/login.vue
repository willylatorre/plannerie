<script setup>
import { useRouter } from 'nuxt/app';

definePageMeta({
  layout: 'empty',
})

const email = ref('')
const loading = ref(false)
const password = ref('')
const checked = ref(false)
const isSignUp = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);
const client = useSupabaseClient();
const supaUser = useSupabaseUser();
const router = useRouter()


const signUp = async () => {
  loading.value = true
  errorMsg.value = null;
  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    successMsg.value = 'Signed up correctly 🎉. Redirecting ...'
  } catch (error) {
    errorMsg.value = error.message;
    console.error('error', error);
  } finally {
    loading.value = false
  }
};

const login = async () => {
  loading.value = true
  errorMsg.value = null;
  try {
    const { user, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    successMsg.value = 'Signed incorrectly 🎉. Redirecting ...'
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    console.error('error', error);
  } finally {
    loading.value = false
  }
};

onMounted(() => {
  watchEffect(() => {
    if (supaUser?.value) {
      router.replace({ name: 'admin' })
    }
  });
});
</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 xl:col-6"
        style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4"
          style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <img src="/images/logo.svg" alt="Image" height="50" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome
            </div>
            <span class="text-600 font-medium"> {{ isSignUp ? 'Sign up' : 'Sign in' }} to continue</span>
          </div>

          <form @submit.prevent="() => (isSignUp ? signUp() : login())" class="w-full md:w-10 mx-auto">
            <Message severity="error" v-if="errorMsg" :closable="false" class="mb-4">{{ errorMsg }}</Message>
            <Message severity="success" v-if="successMsg" :closable="false" class="mb-4">{{ successMsg }}</Message>

            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
              style="padding:1rem;" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model="password" placeholder="Password" :toggle-mask="true" class="w-full mb-3"
              input-class="w-full" input-style="padding:1rem" />

            <div class="flex align-items-center justify-content-between mb-5" v-if="!isSignUp">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)">Forgot password?</a>
            </div>

            <!-- // TODO Password reset https://supabase.com/docs/reference/dart/v0/reset-password-email -->
            <Button :label="isSignUp ? 'Create an account' : 'Log In'" class="w-full p-3 text-xl" type="submit"
              :loading="loading" />

            <div class="mt-4 flex justify-content-center">
              <Button @click="isSignUp = !isSignUp" class="underline p-button-link" :disabled="loading">
                <span v-if="isSignUp"> Have an account? Log in instead </span>
                <span v-else> Create a new account </span>
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
