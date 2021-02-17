import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Desktop, TabletOrSmaller, Mobile } from '../../components/media-queries'

const year = new Date().getFullYear()

const Footer = ({ year }) => (
    <Fragment>
        <TabletOrSmaller>
            <footer className="c-footer u-padding-top-lg u-padding-bottom-lg">
                <div className="c-footer__content">
                    <p className="qa-footer__copyright">&copy; {year} Makana Healthcare Mobile</p>
                </div>
            </footer>
        </TabletOrSmaller>
        <Desktop>
            <footer className="c-footer u-padding-top-lg u-padding-bottom-lg">
                <div className="c-footer__content">
                    <p className="qa-footer__copyright">&copy; {year} Makana Healthcare Desktop</p>
                </div>
            </footer>
        </Desktop>
    </Fragment>
)

Footer.defaultProps = {
    year
}

Footer.propTypes = {
    year: PropTypes.node
}

export default Footer
