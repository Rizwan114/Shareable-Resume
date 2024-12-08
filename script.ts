declare const html2pdf : any;

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resume-Photo") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeEducation = document.getElementById("Education") as HTMLParagraphElement;
const resumeSkills = document.getElementById("Skills") as HTMLParagraphElement;
const resumeContentButton = document.getElementById("resumeContent") as HTMLDivElement;
const resumeButton = document.getElementById("submit") as HTMLButtonElement;
const resumeShare = document.getElementById("share") as HTMLButtonElement;
const resumeEdit = document.getElementById("edit") as HTMLButtonElement;
const resumePdf = document.getElementById("PDF") as HTMLButtonElement;
 

form.addEventListener("submit", async (event:Event)=>{
    event.preventDefault()


    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const photo = document.getElementById("Photo") as HTMLInputElement;

    const photoFile = photo.files?   photo.files[0]:null;

    let photoBase64 =``;

    if(photoFile){
        photoBase64 = await fileToBase64(photoFile);
        localStorage.setItem("resume-Photo", photoBase64)

        resumePhoto.src = photoBase64;

    }

    document.querySelector(".resume-container")?.classList.add("hidden");
    resumePage.classList.remove("hidden")

    resumeName.textContent = `Name : ${name}`;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `Education:  ${education}`;
    resumeSkills.textContent = `Skills : ${skills}`;


    const share = new URLSearchParams({
        name : name,
        email :email,
        phone : phone,
        education : education,
        skills : skills,
    });
    
    const userURL = `${window.location.origin}?${share.toString()}`
    resumeShare.addEventListener("click",()=>{
        navigator.clipboard.writeText(userURL);
        alert("Link Copy")
    });

    window.history.replaceState(null, '', `${share.toString()}`);
    
});


function fileToBase64(file:File):Promise<string>{
    return new Promise((res,rej)=>{
        const  reader = new FileReader();

        reader.onloadend = () => res (
            reader.result as string
        )

        reader.onerror = rej ;
        reader.readAsDataURL(file);
    })
}


resumeEdit.addEventListener("click", ()=>{
    updateFormFromResume ();
    document.querySelector(".resume-container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");
})

function updateFormFromResume (){
    const [education] = resumeEducation.textContent?.split("from") || [];
    (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace ('Email','') || '';
    (document.getElementById("phone") as HTMLInputElement).value = resumePhone.textContent?.replace('Phone','') || '';
    (document.getElementById("Education") as HTMLInputElement).value = education || '';
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
}

resumePdf.addEventListener('click',()=>{
    if(typeof html2pdf === 'undefined'){
        alert('Error:html2pdf library is not dawnloded')
        return;
    }



const resumeDownload = {
    margin : 0.5,
    filename : 'Resume Dawnload.PDF',
    image : {typeof : 'jpeg',quality : 1.0},
    html2canvas : {scale : 2},
    jsPDF : {unit : 'in',format : 'latter', orientation:'portrait'}    
}

console.log(resumeDownload);


html2pdf()

.from(resumeContentButton)
.set(resumeDownload)
.save()

.catch((error:Error)=>{
    console.error("Dawnload PDF",error)    
})

});

window.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '' ;
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const education = params.get('education') || '';
    const skills = params.get('skills') || '';

    if (name || email || phone || education || skills){ 
        resumeName.textContent = `Name : ${name}`;
        resumeEmail.textContent = `Email : ${email}`;
        resumePhone.textContent = `Phone : ${phone}`;
        resumeEducation.textContent = `Education:  ${education}`;
        resumeSkills.textContent = `Skills : ${skills}`;

        const userPhoto = localStorage.getItem("resume-Photo")
        if(userPhoto){
            resumePhoto.src = userPhoto;
        }

        document.querySelector(".resume-container")?.classList.add("hidden");
        resumePage.classList.remove("hidden");

    }
})


resumePhoto.style.width ="150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%";
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";