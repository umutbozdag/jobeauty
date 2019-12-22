const inputDetail = document.getElementById("inputDetail");
const inputLocation = document.getElementById("inputLocation");
const inputJobType = document.getElementById("inputJobType");

const buttonSearch = document.getElementById("buttonSearch");

const githubResult = document.getElementById("resultGithub");
const resultRemoteOk = document.getElementById("resultRemoteOk");
const resultCodepen = document.getElementById("resultCodepen");
const resultAJ = document.getElementById("resultAJ");
const resultWeWork = document.getElementById("resultWeWork");
const resultLandingJobs = document.getElementById("resultLandingJobs");

const loader = document.querySelector('.loader');

const optionAllJobs = document.getElementById("allJobs");
const optionGithubJobs = document.getElementById('githubJobs');
const optionRemoteOk = document.getElementById('remoteOk');
const optionCodepenJobs = document.getElementById('codepenJobs');
const optionAjJobs = document.getElementById('weWorkJobs');
const optionWeWork = document.getElementById('weWorkJobs');
const optionLandingJobs = document.getElementById('landingJobs');
const showResultsBtn = document.getElementById("show-results-btn");

let allJobs = [];
let jobsGithub = [];
let jobsWeWork = [];
let jobsRemoteOk = [];
let jobsAJ = [];
let jobsCodepen = [];
let jobsLanding = [];

// Display all the jobs when the window is loaded
window.addEventListener('load', displayAllJobs);



showResultsBtn.addEventListener('click', () => {
    if (optionAllJobs.selected) {
        displayAllJobs();
    } else if (optionGithubJobs.selected) {
        displayGithubJobs();
    } else if (optionRemoteOk.selected) {
        displayRemoteOkJobs();
    } else if (optionCodepenJobs.selected) {
        displayCodepenJobs();
    } else if (optionWeWork.selected) {
        displayWeWorkJobs();
    } else if (optionLandingJobs.selected) {
        displayLandingJobs();
    }
})

// // getData("https://www.weworkmeteor.com/api/jobs", jobsWeWork);

// let a, b, c, d, e;
// Promise.all([
//         fetch('https://github-jobs-proxy.appspot.com/positions?description=&location='),
//         fetch('https://www.weworkmeteor.com/api/jobs'),
//         fetch("https://remoteok.io/api"),
//         fetch("https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=986ed32d86ee52b3526699807b65fd75&method=aj.jobs.search&format=json&perpage=100"),
//         fetch("https://codepen.io/jobs.json")
//     ]).then(async ([github, wework, remoteok, aj, codepen]) => {
//         a = await github.json();
//         b = await wework.json();
//         c = await remoteok.json();
//         d = await aj.json();
//         e = await codepen.json();


//         return [a, b, c, d, e];
//     })
//     .then((data) => {
//         console.log(data)
//         allJobs.push(...data);
//         jobsGithub.push(...a);
//         jobsWeWork.push(b);
//         jobsRemoteOk.push(...c);
//         jobsAJ.push(d);
//         jobsCodepen.push(e);
//         var merged = [].concat.apply([], allJobs);

//          console.log(merged);
//         // console.log(allJobs);
//     }).catch((err) => {
//         console.log(err);

//     });



function displayAllJobs() {

    displayGithubJobs();

    // displayWeWorkJobs();

    displayRemoteOkJobs();

    // displayCodepenJobs();

    displayAjJobs();

    displayLandingJobs();
}

function displayGithubJobs() {
    fetch("https://github-jobs-proxy.appspot.com/positions?description=&location=")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsGithub.push(...data);
            if (!jobsGithub.length == 0) {
                const html = jobsGithub.reduce((acc, {
                        title,
                        location,
                        url,
                        type,
                        company,
                        company_url,
                        created_at,
                        company_logo,
                        description,
                        how_to_apply,
                        id

                    }) =>

                    acc += ` 

             <div class="job-header">
                <img src="${company_logo ? company_logo : "images/question-sign.svg"}" class="company-logo"></img>
                            <div class="job-header-2">
                                <a href="${url}" target="_blank" class="job-title">${title}</a>
                                <a href="${company_url}" target="_blank" class="job-company">${company}</a>
                            </div>
                        </div>
                        <p class="job-desc"></p>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-map-marker-alt"></i>${location}</p>
                            <p class="job-type"><i class="fas fa-suitcase-rolling"></i>${type}</p>
                        </div>
                        <hr>`, ``);

                githubResult.innerHTML = html;
                jobsGithub = [];
                loader.style.display = "none";
                document.querySelector('.job-filter').style.display = "block";

            }
        }).catch(err => {

            console.log(err);
        })
}


function displayRemoteOkJobs() {
    fetch("https://remoteok.io/api")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsRemoteOk.push(...data);
            if (!jobsRemoteOk.length == 0) {

                // Remove the first element from array
                jobsRemoteOk.shift();

                const htmlRemoteOk = jobsRemoteOk.reduce((acc, {
                        url,
                        company,
                        created_at,
                        company_logo,
                        description,
                        position,
                        tags
                    }) =>
                    acc += ` 

             <div class="job-header">
                <img src="${company_logo ? company_logo : "images/question-sign.svg"}" class="company-logo"></img>
                            <div class="job-header-2">
                                <a href="${url}" target="_blank" class="job-title">${position}</a>
                                <a target="_blank" class="job-company">${company ? company : "No Company Info"}</a>
                            </div>
                        </div>
                        <p class="job-desc"></p>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-tags"></i>${tags.map(tag => {
                              return tag.toUpperCase();  
                            }).join(', ')}</p>
                            
                        </div>
                        <hr>`, ``);


                resultRemoteOk.innerHTML = htmlRemoteOk;
                jobsRemoteOk = [];
                loader.style.display = "none";
                document.querySelector('.job-filter').style.display = "block";

            }
        }).catch(err => {
            console.log(err);
        })

}

function displayWeWorkJobs() {
    fetch("https://www.weworkmeteor.com/api/jobs")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsWeWork.push(data);
            console.log(jobsWeWork);
        }).catch(err => {

            console.log(err);
        })

    // if (!jobsWeWork.length == 0) {

    //     // Remove the first element from array
    //     let acc;
    //     const htmlWeWork = jobsWeWork.map(jobWeWork => {
    //         return acc += ` 

    //          <div class="job-header">
    //             <img src="${jobWeWork.data.company_logo ? jobWeWork.data.company_logo : "images/question-sign.svg"}" class="company-logo"></img>
    //                         <div class="job-header-2">
    //                             <a href="${jobWeWork.data.map(element => {
    //                               return element.siteUrl;  
    //                             })}" target="_blank" class="job-title">${jobWeWork.data.map(element => {
    //                                 return element.title;
    //                             })}</a>
    //                             <a target="_blank" class="job-company">${jobWeWork.data.map(element => {
    //                                 return element.company;
    //                             })}</a>
    //                         </div>
    //                     </div>
    //                     <p class="job-desc"></p>
    //                     <div class="job-tags">
    //                         <p class="job-location"><i class="fas fa-map-marker-alt"></i>${jobWeWork.data.map(element => {
    //                             return element.location;
    //                         })}</p>
    //                          <p class="job-type"><i class="fas fa-suitcase-rolling"></i>${jobWeWork.data.map(element => {
    //                             return element.jobtype;
    //                         })}</p>
    //                     </div>
    //                     <hr>`;
    //     }).join('');

    //     acc = ``;


    //     resultWeWork.innerHTML = htmlWeWork;
    //     jobsWeWork = [];
    //     loader.style.display = "none";
    //     document.querySelector('.job-filter').style.display = "block";

    // }


    if (!jobsWeWork.length == 0) {
        const htmlWeWork = jobsWeWork.reduce((acc, {
                data
            }) =>

            acc += ` 

             <div class="job-header">
                <img src="${data.company_logo ? data.company_logo : "images/question-sign.svg"}" class="company-logo"></img>
                            <div class="job-header-2">
                                <a href="${data.map(element => {
                                    return element.siteUrl;
                                })}" target="_blank" class="job-title">${data.map(element => {
                                    return element.title[0];
                                })}</a>
                                <a target="_blank" class="job-company">${data.company ? data.company : "No Company Info"}</a>
                            </div>
                        </div>
                        <p class="job-desc"></p>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-tags"></i>${data.map(element => {
                                return element.location;
                            })}</p>
                            
                        </div>
                        <hr>`, ``);


        resultWeWork.innerHTML = htmlWeWork;
        jobsRemoteOk = [];
        loader.style.display = "none";
        document.querySelector('.job-filter').style.display = "block";

    }
}

function displayCodepenJobs() {
    fetch("https://codepen.io/jobs.json")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsCodepen.push(data);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })


    if (!jobsCodepen.length == 0) {


        // const htmlCodepen = jobsCodepen.reduce((acc, {
        //         jobs
        //     }) =>
        //     acc += ` 

        //      <div class="job-header">
        //         <img src="${jobs.company_logo ? jobs.company_logo : "images/question-sign.svg"}" class="company-logo"></img>
        //                     <div class="job-header-2">
        //                         <a href="${jobs.map(job => {
        //                             return job.url;
        //                         })}" target="_blank" class="job-title">${jobs.map(job => {
        //                             return job.title;
        //                         }).join(' BOŞLUk')}</a>
        //                         <a target="_blank" class="job-company">${jobs.company_name ? jobs.company_name : "No Company Info"}</a>
        //                     </div>
        //                 </div>
        //                 <p class="job-desc"></p>
        //                 <div class="job-tags">
        //                     <p class="job-location"><i class="fas fa-tags"></i>${jobs.location}</p>

        //                 </div>
        //                 <hr>`, ``);


        // resultCodepen.innerHTML = htmlCodepen;
        // jobsCodepen = [];
        // loader.style.display = "none";
        // document.querySelector('.job-filter').style.display = "block";

    }
}


function displayAjJobs() {
    // fetch("https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=986ed32d86ee52b3526699807b65fd75&method=aj.jobs.search&format=json&perpage=100")
    //     .then((response) => {
    //         return response.json();
    //     }).then((data) => {
    //         //displayJobs();
    //         //jobsGithub = [];
    //         // jobsRemoteOk = [];
    //         console.log(data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
}


function displayLandingJobs() {
    fetch("https://landing.jobs/api/v1/jobs.json")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsLanding.push(...data);
            // console.log(data);

            if (!jobsLanding.length == 0) {
                const htmlLandingJobs = jobsLanding.reduce((acc, {
                        company_logo,
                        city,
                        title,
                        tags,
                        type,
                        url,
                        company_id,
                        logo_url
                    }) =>


                    acc += ` 

             <div class="job-header">
                <img src="${company_logo ? company_logo : "images/question-sign.svg"}" class="company-logo"></img>
                            <div class="job-header-2">
                                <a href="${url}" target="_blank" class="job-title">${title}</a>
                                <a target="_blank" class="job-company">${getData(company_id)}</a>
                            </div>
                        </div>
                        <p class="job-desc"></p>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-tags"></i>${tags.map(tag => {
                                return tag.toUpperCase();
                            }).join(', ')}</p>
                            
                        </div>
                        <hr>`, ``);


                resultLandingJobs.innerHTML = htmlLandingJobs;
                jobsLanding = [];
                loader.style.display = "none";
                document.querySelector('.job-filter').style.display = "block";
            }
        }).catch(err => {
            console.log(err);
        });


    // async function getCompany(company_id) {
    //     let response = await fetch(`https://landing.jobs/api/v1/companies/${company_id}`);
    //     let data = await response.json();
    //     companies.push(data);
    //     console.log(data);
    // }


}
let companies = [];
let company_name = "";

function getData(company_id) {
    fetch(`https://landing.jobs/api/v1/companies/${company_id}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            companies.push(data);
            companies.map((company) => company.name);
        }).catch(err => {
            console.log(err);
        });
}




buttonSearch.addEventListener("click", () => {
    fetch(`https://github-jobs-proxy.appspot.com/positions?description=${inputDetail.value ? inputDetail.value : ''}&location=${inputLocation.value ? inputLocation.value : ''}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsGithub.push(...data);
            console.table(jobsGithub);
            loader.style.display = "block";
            displayJobs();
        })
    inputDetail.value = '';
    inputLocation.value = '';
    jobsGithub = [];
    jobsRemoteOk = [];
});