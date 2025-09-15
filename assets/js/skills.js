
// Render skills with embedded data (works from file:// without fetch)
(function(){ 
  const data = {
  "Networking": [
    {
      "name": "IP addressing & Subnetting",
      "level": 90
    },
    {
      "name": "Networking Fundamentals",
      "level": 90
    },
    {
      "name": "Troubleshooting",
      "level": 85
    },
    {
      "name": "Routing & Switching",
      "level": 80
    }
  ],
  "Systems": [
    {
      "name": "Linux Administration",
      "level": 85
    },
    {
      "name": "Windows Server & AD",
      "level": 75
    }
  ],
    "Backup & Recovery": [
    {
      "name": "Veeam Backup & Replication",
      "level": 80
    }
  ],
  "Automation & DevOps": [
      {
      "name": "Ansible",
      "level": 75
    },
        {
      "name": "Docker",
      "level": 75
    },
    {
      "name": "Jenkins (CI/CD)",
      "level": 70
    },
  ],

  "Scripting": [
    {
      "name": "Python",
      "level": 85
    },
    {
      "name": "Bash",
      "level": 70
    }
  ],
    "Virtualization": [
    {
      "name": "Virtualization Concepts",
      "level": 80
    },
    {
      "name": "VMware vSphere",
      "level": 85
    }
  ],
  "Cloud (AWS)": [
    {
      "name": "AWS Basics (IAM, S3, EC2)",
      "level": 65
    }
  ],
  "Version Control": [
    {
      "name": "Git & GitHub",
      "level": 80
    }
  ],
};

  // Icon mapping for skill groups
  const iconMap = {
    "Networking": "assets/icons/networking.svg",
    "Systems": "assets/icons/systems.svg",
    "Virtualization & Cloud": "assets/icons/virtualization.svg",
    "Automation & DevOps": "assets/icons/devops.svg",
    "Operating Systems": "assets/icons/os.svg",
    "Backup & Recovery": "assets/icons/backup.svg",
    "Scripting": "assets/icons/scripting.svg",
    "Automation": "assets/icons/automation.svg",
    "Cloud (AWS)": "assets/icons/cloud.svg",
    "Virtualization": "assets/icons/virtualization.svg",
    "Version Control": "assets/icons/git.svg"
  };

  function render(){ 
    const wrap = document.getElementById('skills-container');
    if(!wrap) return;
    wrap.innerHTML = "";
    Object.entries(data).forEach(([group, items]) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `<img class="skill-icon" src="${iconMap[group] || 'assets/icons/default.svg'}" alt="${group} icon"/><h4>${group}</h4>`;
      items.forEach(it => {
        const row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = `
          <div class="label"><small>${it.name}</small><small class="pct" aria-hidden="true">${it.level}%</small></div>
          <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <span data-target="${it.level}" style="width:0%"></span>
          </div>`;
        card.appendChild(row);
      });
      wrap.appendChild(card);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.progress > span').forEach(span => {
            const target = +span.dataset.target;
            requestAnimationFrame(() => {
              span.style.width = target + '%';
              const pb = span.parentElement;
              pb.setAttribute('aria-valuenow', target);
            });
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
