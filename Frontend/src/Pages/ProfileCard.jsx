import { PaperClipIcon } from '@heroicons/react/20/solid'
import { ProfileEdit } from '../components/ProfileEdit'

export default function ProfileCard() {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl border border-gray-200 shadow-lg bg-white space-y-8">

            {/* Header */}
            <div className="px-4 sm:px-0 space-y-2 flex justify-between items-start">
                <div>
                    <h3 className="text-base/7 font-semibold text-blue-700 text-5xl">Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-blue-700 text-4xl">Personal details and application</p>
                </div>
                <ProfileEdit />
            </div>
            <div className="mt-6 border-t border-white/10">
                <dl className="divide-y divide-white/10">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-blue-700">Profile Picture <span className="text-xs cursor-pointer hover:text-blue-900 transition">🖋️</span></dt>
                        <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"><img src={user.profilePic || user.ProfilePic} alt="" className='size-30 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10' /></dd>
                    </div>
                </dl>
                <div className="mt-6 border-t border-white/10">
                    <dl className="divide-y divide-white/10">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-blue-700">Full name <span className="text-xs cursor-pointer hover:text-blue-900 transition">🖋️</span></dt>
                            <dd className="mt-1 text-sm/6 text-blue-700 sm:col-span-2 sm:mt-0">{user.Name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-blue-700">Email address<span className="text-xs cursor-pointer hover:text-blue-900 transition">🔒</span></dt>
                            <dd className="mt-1 text-sm/6 text-blue-700 sm:col-span-2 sm:mt-0">{user.Email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium text-blue-700 flex items-center gap-2">
                                Bio
                                <span className="text-xs cursor-pointer hover:text-blue-900 transition">🖋️</span>
                            </dt>
                            <dd className="mt-1 text-sm/6 text-blue-700 sm:col-span-2 sm:mt-0">
                                {user.Bio}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
