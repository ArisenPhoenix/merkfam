import { useRouter } from "next/router"
import { linkify } from "../../../../Helpers/Text/text"
import css from "./NavItem.module.css"
import { useClass } from "../../../../hooks/usehooks"
import { DEFAULT_PROP } from "../../../../Helpers/Verifications/Validations"

const NavItem = (props) => {
    const router = useRouter()
    const isMobile = props.isMobile
    const borders = props.borders
    const pos = props.position
    const loc = pos === "left" ? css.left : pos === "right" ? css.right : css.center
    const border = isMobile & borders ? css.mobileBorder : !isMobile & borders ? css.border : null
    const classes = !isMobile ? css.navItem : css.mobileNavItem
    const innerClass = props.innerClass ? props.innerClass : ""
    const outerClass = props.outerClass ? props.outerClass : ""

    const itemClass = useClass([loc, border, outerClass, classes])
    const textClass = useClass([innerClass, !isMobile ? css.navTextClass : css.mobileNavTextClass])

    const href = props.href ? props.href : linkify(props.text)
    const height = DEFAULT_PROP(props.height, "3rem")
    const width = DEFAULT_PROP(props.width, "7rem")

    const handleClick = (e) => {
        e.preventDefault()
        props.setCurrentPage && props.setCurrentPage({text: props.text, href: href})
        router.push(href)
    }

    return (
            <li className={itemClass} style={{width: width, height: height}} onClick={handleClick}>
                <p className={textClass} style={{lineHeight: height}}>{props.text}</p>
            </li>
    )

}

export default NavItem

// export const NavButton = (props) => {
//     const 
// }