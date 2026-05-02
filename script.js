const teamData = {
    'mea': {
        name: "Mea Kwon",
        title: "Financial Services & Human Capital",
        bio: "With 30 years at the intersection of financial services and human capital strategy, Mea transforms complex compensation data into clear narratives that drive business decisions. She has a proven track record of building scalable tools and processes that stick across organizations of every size."
    },
    'harry': {
        name: "Harry Leung",
        title: "Data Infrastructure & Architecture",
        bio: "Harry specializes in data infrastructure that quietly eliminates problems most teams don't yet know they have. With 15+ years designing resilient data architecture across talent and operations, he translates strategic intent into systems that work and scale."
    },
    'nancy': {
        name: "Nancy Maloney",
        title: "C.P.A. & Data Governance",
        bio: "Nancy is a licensed C.P.A. with deep expertise in Data Governance, Data Quality, Metadata, Business Intelligence, and Risk. She brings clients a rare blend of analytical rigor and real-world operational know-how across finance, audit, and technology.​"
    },
    'natalie': {
        name: "Natalie Johnson, Advisory",
        title: "Learning & Development",
        bio: "Natalie has spent 15+ years helping organizations build the people systems and learning frameworks that make everything else run better. She specializes in translating high-level strategy, from enterprise performance management to leadership development, into programs teams can execute and measure."
    }
};

const whowhatourData = {
    'who': {
        name: "Who We Are",
        description: "Most business don’t have a data problem, they have an alignment problem. Executives want growth, managers want efficiency, and technical teams want clarity. We bridge all three. Parralign is a team of seasoned consultants with over 100 years of combined hands on experience in Data Analysis, Data Modeling, Data Governance, Business Intelligence, and Reporting – across HR, Finance, Accounting, Financial Services, and Healthcare."
    },
    'what': {
        name: "What We Do",
        description: "We turn complex, tangled data challenges into clear, actionable solutions tailored to your business. Whether you’re struggling with operational inefficiencies, reporting gaps, or risk exposures, we deliver practical strategies that reduces friction, improve decision-making, and create measurable results – fast."
    },
    'our': {
        name: "Our Focus",
        description: "We focus on companies from startup to established that need internal data infrastructure solutions that match their ambitions and goals. If your team is making decisions based on spreadsheets, disconnected systems or incomplete reporting, you’re exactly who we built parralign for.​"
    }
};

// --- Function for Home Page Popups ---
function openB3(key) {
    const data = whowhatourData[key];
    const modal = document.getElementById('b3Modal');
    if (data && modal) {
        document.getElementById('b3Name').innerText = data.name;
        document.getElementById('b3description').innerText = data.description;
        modal.style.display = "block";
    }
}

// --- Function for Team Page Popups ---
function openBio(key) {
    const data = teamData[key];
    const modal = document.getElementById('bioModal');
    if (data && modal) {
        document.getElementById('bioName').innerText = data.name;
        document.getElementById('bioTitle').innerText = data.title || "";
        document.getElementById('bioText').innerText = data.bio;
        modal.style.display = "block";
    }
}

// Separate Close Functions
function closeB3() { document.getElementById('b3Modal').style.display = "none"; }
function closeBio() { document.getElementById('bioModal').style.display = "none"; }

// --- SHARED CLICK-OUTSIDE LISTENER ---
window.onclick = function(event) {
    const bioModal = document.getElementById('bioModal');
    const b3Modal = document.getElementById('b3Modal');

    // These checks prevent the "null" error
    if (bioModal && event.target === bioModal) {
        bioModal.style.display = "none";
    }
    if (b3Modal && event.target === b3Modal) {
        b3Modal.style.display = "none";
    }
};