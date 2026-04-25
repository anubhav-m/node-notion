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
            Hi, I'm Anubhav
          </h1>

          <div className='flex flex-col gap-10 items-center'>
            <div className='text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-xl'>
              <p>
                I am a passionate software developer who finds joy in turning complex problems
                into elegant, functional code. NodeNotion is my personal digital garden, a space
                where I share my journey, insights, and everything I'm discovering in the
                ever-evolving world of technology.
              </p>
            </div>

            <div className='relative py-6 px-4'>
              <span className='absolute top-0 left-0 text-6xl text-teal-500/20 font-serif leading-none'>"</span>
              <blockquote className='text-2xl font-medium italic font-serif text-gray-800 dark:text-gray-200 max-w-lg text-center relative z-10'>
                Still learning. Still building. Still improving.
              </blockquote>
              <span className='absolute bottom-0 right-0 text-6xl text-teal-500/20 font-serif leading-none'>"</span>
            </div>
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