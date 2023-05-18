import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
import css from "../classes.module.css"
import { financeItems } from "../../Components/NavItems";
import {NextButton} from "../../Merkurial/Components/UI/Buttons/Button";
import { useClass } from "../../Merkurial/hooks/usehooks";
import animation from "../../Merkurial/CSS/Animations/pop.module.css"
import { DE_KEBABIFY, SuperTitleFy } from "../../Merkurial/Helpers/Text/text";

const Finances = (props) => {   
    const classes = useClass([css.buttonDiv])
    const buttonClasses = useClass([css.button, animation.pop])
    return (
    <AUTH_GUARD needsLoggedIn={true}>
        <div className={css.buttonsDiv}>
            {financeItems.map((butt, index) => {
                return (
                    <NextButton 
                        key={index} 
                        text={SuperTitleFy(DE_KEBABIFY(butt.text, "-"))} 
                        className={classes}
                        buttonClass={buttonClasses} 
                        href={`finances/${butt.text.toLowerCase()}`}
                        />
                    )
            })}
        </div> 
    </AUTH_GUARD>
    );
}

export default Finances   