import { Footer, FooterTitle, FooterLinkGroup, FooterLink, FooterDivider, FooterCopyright } from "flowbite-react"
import { Link } from "react-router-dom"

export default function FooterComp() {
    return (
        <Footer container className="flex flex-col border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col w-full justify-between sm:flex-row">
                    <div className="mt-3">
                        <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Node</span>
                            Notion
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-6 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title='About' />
                            <FooterLinkGroup col>
                                <FooterLink as={Link} to="/about">
                                    About the creator
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>

                        <div>
                            <FooterTitle title='Follow Me' />
                            <FooterLinkGroup col>
                                <FooterLink href="https://github.com/anubhav-m/node-notion" target="_blank" rel="noopener noreferer">
                                    Github
                                </FooterLink>
                                <FooterLink href="https://www.linkedin.com/in/anubhav--m/" target="_blank" rel="noopener noreferer">
                                    LinkedIn
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>

                    </div>
                </div>
            </div>

            <FooterDivider />
            <FooterCopyright
                href="https://github.com/anubhav-m"
                by='Made with ❤ by Anubhav Mishra'
                year={new Date().getFullYear()}
            />
        </Footer>
    )
}