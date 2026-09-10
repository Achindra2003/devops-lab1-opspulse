/**
 * OpsPulse — DevOps Telemetry & Deployment Engine
 * Collaborative Git Workflow Project - Lab 1
 */

document.addEventListener('DOMContentLoaded', () => {
  // Service state definitions
  const services = {
    gateway: { name: 'API Gateway', baseLat: 18, status: 'healthy' },
    auth: { name: 'Auth & IAM Service', baseLat: 32, status: 'healthy' },
    db: { name: 'PostgreSQL Primary', baseLat: 12, status: 'healthy' },
    worker: { name: 'Worker Async Queue', baseLat: 45, status: 'healthy' },
    cache: { name: 'Redis Cache Cluster', baseLat: 3, status: 'healthy' }
  };

  // DOM Elements
  const alertBanner = document.getElementById('systemAlertBanner');
  const alertText = document.getElementById('alertText');
  const latencyVal = document.getElementById('latencyVal');
  const latencyTrend = document.getElementById('latencyTrend');
  const uptimeVal = document.getElementById('uptimeVal');
  const errorBudgetVal = document.getElementById('errorBudgetVal');
  const throughputVal = document.getElementById('throughputVal');
  const activeBranch = document.getElementById('activeBranch');
  const activeCommit = document.getElementById('activeCommit');
  const refreshBtn = document.getElementById('refreshBtn');
  const simulateLoadBtn = document.getElementById('simulateLoadBtn');
  const triggerDeployBtn = document.getElementById('triggerDeployBtn');
  const pipelineStatus = document.getElementById('pipelineStatus');
  const auditTimeline = document.getElementById('auditTimeline');
  const envButtons = document.querySelectorAll('.env-btn');
  const toggleButtons = document.querySelectorAll('.toggle-service-btn');

  // Environment state
  const envConfigs = {
    production: { branch: 'main', commit: '#7f4a023', uptime: '99.98%', errorBudget: '94.2%' },
    staging: { branch: 'develop', commit: '#3affb12', uptime: '99.82%', errorBudget: '88.5%' },
    development: { branch: 'feature/telemetry-metrics', commit: '#ec68b4c', uptime: '98.90%', errorBudget: '76.4%' }
  };

  // Update Latency Readings with slight jitter
  function updateTelemetry() {
    let totalLat = 0;
    let count = 0;
    let degradedServices = [];

    Object.keys(services).forEach(key => {
      const s = services[key];
      const latEl = document.getElementById(`lat-${key}`);
      const statEl = document.getElementById(`stat-${key}`);

      if (s.status === 'healthy') {
        const jitter = Math.floor(Math.random() * 8) - 4;
        const currentLat = Math.max(2, s.baseLat + jitter);
        if (latEl) latEl.textContent = `${currentLat} ms`;
        totalLat += currentLat;
        count++;
        if (statEl) {
          statEl.className = 'status-pill status-healthy';
          statEl.textContent = 'Healthy';
        }
      } else if (s.status === 'degraded') {
        const spike = s.baseLat * 4 + Math.floor(Math.random() * 50);
        if (latEl) latEl.textContent = `${spike} ms`;
        totalLat += spike;
        count++;
        degradedServices.push(s.name);
        if (statEl) {
          statEl.className = 'status-pill status-degraded';
          statEl.textContent = 'Degraded';
        }
      } else {
        if (latEl) latEl.textContent = 'TIMEOUT';
        degradedServices.push(s.name);
        if (statEl) {
          statEl.className = 'status-pill status-offline';
          statEl.textContent = 'Offline';
        }
      }
    });

    // Update Average Cluster Latency (Hotfix: Safe Division Guard)
    if (count > 0 && latencyVal) {
      const avg = Math.max(1, Math.round(totalLat / count));
      latencyVal.textContent = `${avg} ms`;
      if (avg > 100) {
        latencyTrend.className = 'metric-trend trend-warning';
        latencyTrend.textContent = `↑ ${avg}ms (Spike)`;
      } else {
        latencyTrend.className = 'metric-trend trend-good';
        latencyTrend.textContent = `↓ ${avg}ms`;
      }
    }

    // Update dynamic throughput reading
    if (throughputVal) {
      const tp = (4.0 + (Math.random() * 0.8)).toFixed(1);
      throughputVal.textContent = `${tp} Gbps`;
    }

    // Refresh Alert Banner according to fleet health
    updateAlertBanner(degradedServices);
  }

  function updateAlertBanner(degradedServices) {
    if (!alertBanner || !alertText) return;

    if (degradedServices.length === 0) {
      alertBanner.className = 'alert-banner alert-normal';
      alertText.textContent = 'All systems operational across clusters [us-east-1, eu-west-1, ap-south-1]. Automated health checks passing.';
    } else if (degradedServices.length === 1) {
      alertBanner.className = 'alert-banner alert-warning';
      alertText.textContent = `WARNING: Latency threshold breached on ${degradedServices[0]}. Automated circuit-breaker active.`;
    } else {
      alertBanner.className = 'alert-banner alert-danger';
      alertText.textContent = `CRITICAL ALERT: Fleet disruption detected (${degradedServices.join(', ')}). Failover active on secondary regions.`;
    }
  }

  // Toggle individual service health
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.getAttribute('data-target');
      if (services[target]) {
        if (services[target].status === 'healthy') {
          services[target].status = 'degraded';
        } else if (services[target].status === 'degraded') {
          services[target].status = 'offline';
        } else {
          services[target].status = 'healthy';
        }
        updateTelemetry();
        logAuditEvent(`Service Status Changed`, `Manual failover simulation on ${services[target].name} to state: ${services[target].status.toUpperCase()}`);
      }
    });
  });

  // Environment switcher
  envButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      envButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const env = btn.getAttribute('data-env');
      const config = envConfigs[env];

      if (config) {
        activeBranch.textContent = config.branch;
        activeCommit.textContent = config.commit;
        uptimeVal.textContent = config.uptime;
        errorBudgetVal.textContent = config.errorBudget;
        logAuditEvent(`Environment Switched`, `Dashboard context changed to ${env.toUpperCase()} environment (branch: ${config.branch})`);
      }
    });
  });

  // Simulate load spike
  if (simulateLoadBtn) {
    simulateLoadBtn.addEventListener('click', () => {
      simulateLoadBtn.disabled = true;
      simulateLoadBtn.textContent = 'Spiking Traffic...';

      services.gateway.status = 'degraded';
      services.worker.status = 'degraded';
      updateTelemetry();
      logAuditEvent('Simulated Traffic Surge', 'Injecting 15,000 req/sec into Kong Ingress. Telemetry latency spike initiated.');

      setTimeout(() => {
        services.gateway.status = 'healthy';
        services.worker.status = 'healthy';
        updateTelemetry();
        simulateLoadBtn.disabled = false;
        simulateLoadBtn.textContent = 'Simulate Load Spike';
        logAuditEvent('Traffic Normalized', 'Cluster auto-scaler allocated +6 pods. Latency returned to nominal SLA.');
      }, 4000);
    });
  }

  // Trigger Deployment Simulation
  if (triggerDeployBtn) {
    triggerDeployBtn.addEventListener('click', () => {
      triggerDeployBtn.disabled = true;
      triggerDeployBtn.textContent = 'Rolling out...';
      if (pipelineStatus) {
        pipelineStatus.textContent = 'Deploying';
        pipelineStatus.style.borderColor = 'var(--color-brand)';
        pipelineStatus.style.color = '#93c5fd';
      }

      logAuditEvent('Deployment Triggered', 'GitHub Actions workflow dispatched: build & rolling update to production cluster.');

      setTimeout(() => {
        triggerDeployBtn.disabled = false;
        triggerDeployBtn.textContent = 'Trigger Rollout Simulation';
        if (pipelineStatus) {
          pipelineStatus.textContent = 'Passing';
          pipelineStatus.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          pipelineStatus.style.color = '#34d399';
        }
        logAuditEvent('Deployment Succeeded', 'Canary verified 100% healthy. Traffic swapped with zero downtime.');
      }, 3000);
    });
  }

  // Refresh Telemetry
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.textContent = '↻ Syncing...';
      setTimeout(() => {
        updateTelemetry();
        refreshBtn.textContent = '↻ Sync';
      }, 400);
    });
  }

  // Helper to prepend audit logs
  function logAuditEvent(title, description) {
    if (!auditTimeline) return;
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot dot-blue"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <strong>${title}</strong>
          <span class="time">Just now</span>
        </div>
        <p>${description}</p>
      </div>
    `;
    auditTimeline.insertBefore(item, auditTimeline.firstChild);

    // Keep max 7 items
    while (auditTimeline.children.length > 7) {
      auditTimeline.removeChild(auditTimeline.lastChild);
    }
  }

  // Initial update & interval
  updateTelemetry();
  setInterval(updateTelemetry, 3500);
});
