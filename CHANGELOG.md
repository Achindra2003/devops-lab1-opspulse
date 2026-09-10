# Changelog

All notable changes to the **OpsPulse** project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.1.0] - 2026-09-10

### Added
- **Network Telemetry (`feature/telemetry-metrics`):** Real-time network throughput and packet egress/ingress metric card with dynamic jitter.
- **Alert Center (`feature/alert-banner`):** High-contrast critical alert notifications for multi-region failover.
- **Incident Trail (`feature/incident-logger`):** Interactive event audit trail documenting cluster maintenance and failovers.
- **Continuous Integration Pipeline:** Automated GitHub Actions workflow auditing syntax, HTML conflict markers, and conventional commits.
- **Repository Governance:** `CODEOWNERS` configuration, standardized PR template, and Git pre-commit/commit-msg hooks.

### Fixed
- **Merge Conflict Resolution:** Resolved conflicting alert banners across `feature/incident-logger` and `feature/alert-banner` into a unified adaptive notification center.
- **Latency Calculation Hotfix (`hotfix/latency-threshold`):** Guarded rolling latency average against zero-division and decimal precision issues under traffic spikes; cherry-picked into `develop`.

---

## [v1.0.0] - 2026-09-10

### Added
- Initial release of OpsPulse DevOps Telemetry & Deployment Portal.
- Real-time fleet health matrix for 5 core microservices (Kong Gateway, Auth, Postgres, RabbitMQ, Redis).
- CI/CD visualizer tracking build, test, and container rollout stages.
- Multi-environment toggle (Production, Staging, Development).
- Pure HTML5/CSS3/Vanilla JS architecture with dark-mode glassmorphism design system.
