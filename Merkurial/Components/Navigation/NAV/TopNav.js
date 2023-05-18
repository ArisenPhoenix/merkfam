import css from "./TopNav.module.css"
import { useClass } from "../../../hooks/usehooks"
import Logo from "./Logo/Logo"
import useToggle from "../../../hooks/Toggle"
import DropDown, { DropDownButton } from "./DropDown/DropDown"
import { getRadius } from "./NavHelpers"
import NavItem from "./NavItem/NavItem"
import Section from "./Section/Section"
import { useContext } from "react"
import MERKURIAL_CONTEXT from "../../../store/Context/MERKURIAL_CONTEXT/merkurial_context"
import { determineAcess } from "./NavHelpers"

/** each dropDown item requires a position prop
 * @param {Object[]} left - for left side of nav @type {Object[]}
 * @param {Object[]} right - for right side of nav @type {Object[]}
 * @param {Object[]} dropDowns - for dropdowns @type {Object[]}
 * @param {string} dropDowns.position - ex: position for left @type {string}
 * @param {boolean} isMobile - is the screen size determined to be mobile or not? @type {boolean}
 * @param {string} radius - bootstrap sizing methodology i.e 'xl' or 'sm' @type {string}
*/
 
const TopNav = (props) => {
    const merkCtx = useContext(MERKURIAL_CONTEXT)
    const userCtx = merkCtx.user
    const dropDowns = props?.dropDowns
    const left = props?.left
    const right = props?.right
    const center = props?.center
    const isMobile = props.isMobile ? props.isMobile : false;
    const [radius, radiusI] = getRadius(props.radius)
    const dropDownClasses = useClass([radiusI])
    const [isDropped, toggleDrop, setIsDropped] = useToggle(false)
    const {isUser, isAdmin} = userCtx.userData
    const topWidth = "4rem";
    const topHeight = props.itemHeight ? props. itemHeight : "4rem";

    const itemHeight = !isMobile ? props.itemHeight ? props.itemHeight : topHeight : null;
    const itemWidth = isMobile ? "100%" : props.itemWidth ? props.itemWidth : "15%";

    const navWidth = props.navWidth ? props.navWidth :"100%"
    const navHeight = props.navHeight ? props.navHeight : "4rem"

    const [leftWidth, rightWidth] = 
    isMobile ? ["100%", "100%"]
    : [props.leftItemWidth 
            ? props.leftItemWidth 
            : itemWidth, props.rightItemWidth 
                ? props.rightItemWidth 
                : props.leftItemWidth 
                    ? props.leftItemWidth 
                    : itemWidth]

    const navClass = useClass([radius, isMobile ? css.navMobile : css.nav]);
    const leftSideWidth = left.length/(left.length+right.length) * 100;
    const rightSideWidth = 100 - leftSideWidth;

    return <>
        <nav style={{height: navHeight, width: navWidth}}>
            <main className={navClass}>
                {
                    <Section position="left" className={css.logoSection} width={isMobile ? "fit-content" : topWidth}>
                        <Logo  src={props.logoImg} alt={props.logoAlt} href="/" width={topWidth} height={topHeight} transition="pop" className={css.logo}/>
                    </Section >
                } 
                
                {!isMobile && left && 
                    <Section className={css.leftSection} style={{width: `${leftSideWidth}%`}} position="left">
                        {left.map((leftItem, index) => {
                            const key = `${index}|${leftItem.name ? leftItem.name : Math.random()}`
                            const hasAccess = determineAcess(isUser, isAdmin, leftItem.requiresUser, leftItem.requiresAdmin, leftItem.isPublic)

                            { return hasAccess && (
                                <NavItem key={key} 
                                    text={leftItem.text}
                                    width={leftWidth/leftSideWidth}
                                    height={itemHeight}
                                    border={props.navBorders && leftItem.border}
                                    isMobile={isMobile}
                                    setCurrentPage={merkCtx.nav.setCurrentPage}
                                />)
                            }
                        })}
                    </Section>
                } 
                {!isMobile &&
                
                    <Section className={css.centerSection} position="center" width="100%">
                        {center && center.map((centerItem, index) => {
                            const key = `${index}|${centerItem.name ? centerItem.name : Math.random()}`
                            const hasAccess = determineAcess(isUser, isAdmin,centerItem.requiresUser, 
                                centerItem.requiresAdmin, centerItem.isPublic)

                            { return hasAccess && 
                                ( 
                                <NavItem key={key}
                                    position="center"
                                    text={centerItem.text}
                                    border={props.navBorders && centerItem.border}
                                    width={rightWidth/rightSideWidth}
                                    height={itemHeight}
                                    isMobile={isMobile}
                                    setCurrentPage={merkCtx.nav.setCurrentPage}
                                />
                                )
                            }
                        })}
                    </Section>
                }

                {isMobile && 
                    <Section className={css.centerSection} position="center" width="100%">
                        <NavItem
                            position="center"
                            text={merkCtx.nav.currentPage.text}
                            border={props.navBorders && centerItem.border}
                            width="fit-content"
                            height={itemHeight}
                            isMobile={isMobile}
                            setCurrentPage={merkCtx.nav.setCurrentPage}
                        />
                        
                    </Section>
                }
            
                
                {!isMobile && right.length > 0 && 
                    <Section className={css.rightSection} style={{width: `${rightSideWidth}%`}} position="right">
                        {right.map((rightItem, index) => {
                            const key = `${index}|${rightItem.name ? rightItem.name : Math.random()}`
                            const hasAccess = determineAcess(isUser, isAdmin,rightItem.requiresUser, rightItem.requiresAdmin, rightItem.isPublic)
                            
                            {return hasAccess && (
                                <NavItem key={key} 
                                    position="right"
                                    text={rightItem.text}
                                    border={props.navBorders && rightItem.border}
                                    width={rightWidth/rightSideWidth}
                                    height={itemHeight}
                                    isMobile={isMobile}
                                    setCurrentPage={merkCtx.nav.setCurrentPage}
                                />)}
                        })}
                    </Section>
                }

                    {!isMobile && dropDowns && dropDowns.map((dropDownItem, index) => {
                        const key=`${index}|${dropDownItem.name ? dropDownItem.name : Math.random()}`
                        {return dropDownItem.public && <NavItem key={key} position={dropDownItem.position} width={rightWidth}/>}
                    })}
                
                {isMobile &&
                    <Section className={css.dropButton} position="right" style={{width: "100%"}}>
                        <DropDownButton
                            onClick={toggleDrop}
                            setIsDropped={setIsDropped}
                            width={topWidth}
                            height={topHeight}
                            transition="pop"
                            as="text"
                        />
                    </Section>
                    }
                    
            </main>
            
            {isMobile && isDropped && 
                <Section className={`${css.dropDownButtonSection} ${css.dropDownDiv}`}>
                    <DropDown 
                        left={left} 
                        right={right} 
                        dropDowns={dropDowns} 
                        className={dropDownClasses}
                        width={topWidth}
                        height={topHeight}
                        border={true}
                        mobileBorders={props.mobileBorders}
                        setCurrentPage={merkCtx.nav.setCurrentPage}
                        isUser={isUser}
                        isAdmin={isAdmin}
                    />
                </Section>
                }

        </nav>
    </>
}

export default TopNav
















