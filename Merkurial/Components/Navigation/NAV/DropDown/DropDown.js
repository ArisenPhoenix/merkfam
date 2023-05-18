import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import css from "./DropDown.module.css"
import NavItem from "../NavItem/NavItem"
import { useClass } from "../../../../hooks/usehooks"
import OutsideAlerter from "../../../../hooks/useOutsideAlerter"
import { getTransition } from "../NavHelpers"
import { verifyWidthHeightForCss } from "../NavHelpers"
import { determineAcess } from "../NavHelpers"

/**
 * @param {icon} props
 * @param {string} height - css style property
 * @param {string} color - css style property
 */

const DropDown = (props) => {
    const sym = props.symbol
    const left = props.left ? props.left : []
    const right = props.right ? props.right : []
    const dropDowns = props.dropDowns ? props.dropDowns : []
    const navItems = [...left, ...right, ...dropDowns]
    const transition = props.transition && getTransition(props.transition)
    const classes = useClass([css.dropDownMain, css.radiusXxsI, props.className, transition])
    const height = props.height
    const isAdmin = props.isAdmin
    const isUser = props.isUser

    return (
        <>
            {navItems.length > 1 &&
                <main className={classes}>
                    {navItems.map((navItem, index) => {
                        const keyInfo = navItem.name ? navItem.name : navItem.id ? navItem.id : Math.random()
                        const key = `${index}|${keyInfo}`
                        const hasAccess = determineAcess(isUser, isAdmin, navItem.requiresUser, navItem.requiresAdmin, navItem.isPublic)
                            { return hasAccess && !navItem.requireLogin && (
                                <NavItem key={key}
                                    text={navItem.text} 
                                    isMobile={true}
                                    height={height/2}
                                    width="100%"
                                    borders={navItem.border}
                                    setCurrentPage={props.setCurrentPage}
                                />
                            )}
                    })}
                </main>
            }
        </>
    )
}

export default DropDown

/**
 * @param {icon} props
 * @param {string} height - css style property
 * @param {string} color - css style property
 */ 
 
export const DropDownButton = (props) => {
    const transition = getTransition(props.transition)
    const [width, height] = verifyWidthHeightForCss(props.width, props.height);
    const pos = props.position && props.position === "left" ? css.left : props.position === "right" ? css.right : css.center
    // const pos = css.center
    const classes = useClass([transition, props.className, pos])

    return (
        <OutsideAlerter setToFalse={props.setIsDropped} className={classes}>
            <div onClick={props.onClick} className={classes}>
                <FontAwesomeIcon
                    icon={faBars}
                    style={{
                        width: width,
                        height: height,
                        color: props.bg ? props.bg : "antiquewhite",
                    }}
                />
            </div>
        </OutsideAlerter>
        )
}
