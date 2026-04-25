import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center py-20'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className='flex flex-col items-center'>
          <img
            src='/my_photo.jpeg'
            alt='Anubhav'
            className='w-40 h-40 rounded-full object-cover border-4 border-teal-500 shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300'
          />
          <h1 className='text-4xl font-semibold text-center my-7 text-gray-800 dark:text-white'>
            About NodeNotion
          </h1>
          <div className='text-md text-gray-600 dark:text-gray-400 flex flex-col gap-6 leading-relaxed'>
            <p>
              Welcome to NodeNotion! This project was created by Anubhav
              as a personal project to share his thoughts and ideas with the
              world. Anubhav is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              Here, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Anubhav is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
          
          <div className='flex items-center gap-6 mt-10'>
            <a 
              href="https://github.com/anubhav-m/" 
              target="_blank" 
              rel="noopener noreferrer"
              className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-110'
            >
              <FaGithub className='text-4xl' />
            </a>
            <a 
              href="https://www.linkedin.com/in/anubhav--m/" 
              target="_blank" 
              rel="noopener noreferrer"
              className='text-gray-600 dark:text-gray-400 hover:text-[#0077b5] transition-all duration-300 transform hover:scale-110'
            >
              <FaLinkedin className='text-4xl' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}