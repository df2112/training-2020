import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'

const year = new Date().getFullYear()

const Footer = ({ year }) => {
    const [path, setPath] = useState('/')

    return (
        <footer className="c-footer u-padding-top-sm u-padding-bottom-sm">
            <div className="c-footer__content">
                <span style={{ paddingRight: 20 }}>
                    <Button href="/search">
                        <IconLabel iconName="search" label="Search" />
                    </Button>
                </span>

                <span>
                    <Button href="/prescriptions">
                        <IconLabel iconName="store" label="Home" />
                    </Button>
                </span>

                <span style={{ paddingLeft: 20 }}>
                    <Button href="/settings">
                        <IconLabel iconName="settings" label="Settings" />
                    </Button>
                </span>
            </div>
        </footer>
    )
}

Footer.defaultProps = {
    year
}

Footer.propTypes = {
    year: PropTypes.node
}

export default Footer
