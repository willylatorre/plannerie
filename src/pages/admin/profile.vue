<template>
    <div>
        <div class="grid" v-if="user">
            <div class="col-12 lg:col-6 xl:col-3">
                <div class="card">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Email</span>
                            <div class="text-900 font-medium text-xl">
                                {{ user.email }}
                            </div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                            style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-user text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button label="Log out" class="w-full p-3 p-button-link" @click="logout">
        </Button>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

const logout = async () => {
    await client.auth.signOut()
    console.log('signedOut')
    router.push('/login')
}

</script>

<style lang="scss" scoped>

</style>