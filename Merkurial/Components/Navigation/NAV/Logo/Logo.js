import { useRouter } from "next/router";
import css from "./Logo.module.css"
import Image from "next/image";
import { useClass } from "../../../../hooks/usehooks";
import { getTransition } from "../NavHelpers";

const Logo = (props) => {
    const router = useRouter();
    const route = (e) => {
        e.preventDefault();
        router.push(props.href);
        props.onClick && props.onClick();
    };

    const transition = getTransition(props.transition)
    const imageClass = useClass([css.logoButton, transition])
    
    return (
        <div 
            type="button" onClick={route} 
            className={imageClass}
            style={{width: props.width ? props.width : null, height: props.height ? props.height : null}}>

                <Image
                    src={props.src}
                    as="preloaded"
                    crossOrigin="anonymous"
                    alt={props.alt}
                    onClick={route}
                    priority={true}
                    placeholder="empty"
                    sizes="(max-width: 200px) 15vw, (max-width: 300px) 15vw"
                    fill
                    rel="preload"
                    className={imageClass}
                />
        </div>
    );

}

export default Logo;