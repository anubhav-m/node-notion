import { TextInput, Select } from 'flowbite-react'

export default function CreatePost() {
    return (
        <div className="flex-1 w-full md:w-200 self-center px-6">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="expressjs">Express.js</option>

                    </Select>
                </div>
            </form>
        </div>
    )
}