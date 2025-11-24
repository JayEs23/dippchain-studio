# DippChain Web Application - Complete Use Cases

## Overview
DippChain is an AI-powered IP protection and fractionalization platform built on Story Protocol. This document outlines all user-facing use cases that the web application must support.

---

## 1. User Onboarding & Profile Management

### 1.1 Wallet Connection
**Actor**: New/Returning User  
**Goal**: Connect wallet to access DippChain features

**Flow**:
1. User visits DippChain homepage
2. Clicks "Connect Wallet" button
3. Selects wallet provider (MetaMask, WalletConnect, Coinbase Wallet, etc.)
4. Approves connection
5. Wallet address is stored/retrieved from database
6. User profile is auto-created or loaded

**Data Stored**:
- Wallet address (primary identifier)
- Connection timestamp
- Last active timestamp

---

### 1.2 Profile Creation & Management
**Actor**: User  
**Goal**: Create and manage user profile

**Flow**:
1. After wallet connection, user sees profile page
2. User can optionally add:
   - Display name
   - Bio/description
   - Avatar (IPFS upload)
   - Social links (Twitter, GitHub, etc.)
3. Profile is saved to database
4. Profile is linked to wallet address

**Data Stored**:
- UserProfile record with wallet address as primary key
- Display name, bio, avatar CID
- Social links
- Created/updated timestamps

---

### 1.3 KYC Verification (Optional)
**Actor**: User  
**Goal**: Complete KYC for regulated features (if required)

**Flow**:
1. User navigates to KYC page
2. User submits identity documents
3. Documents are verified (via third-party service)
4. KYC status is updated in profile
5. User gains access to regulated features

**Data Stored**:
- KYC status (pending, verified, rejected)
- KYC provider reference ID
- Verification timestamp

---

## 2. IP Registration & Management

### 2.1 Register New IP Asset
**Actor**: Creator/Content Owner  
**Goal**: Register a Story Protocol NFT as DippChain IP

**Flow**:
1. User navigates to "Register IP" page
2. User connects Story Protocol NFT:
   - Selects NFT from wallet
   - Or enters Story NFT contract + tokenId
3. System fetches NFT metadata from Story Protocol
4. User uploads watermark file (optional but recommended)
5. User adds content CIDs (IPFS hashes) for versions
6. User enables/disables AI detection
7. User reviews and confirms registration
8. Transaction is signed (IPRegistryAdapter.registerStoryIP)
9. Registration is confirmed on-chain
10. IP record is indexed and stored in database
11. User is redirected to IP detail page

**Data Stored**:
- IP record with DippChain ID
- Story NFT contract + tokenId
- Watermark hash (IPFS CID)
- Content CIDs array
- Detection enabled status
- Registration timestamp
- Owner address

**Contract Interaction**: `IPRegistryAdapter.registerStoryIP()`

---

### 2.2 View IP Assets
**Actor**: Any User  
**Goal**: Browse and search registered IP assets

**Flow**:
1. User navigates to "IP Assets" or "Explore" page
2. System displays paginated list of IPs
3. User can:
   - Search by title, description, owner
   - Filter by category, status, owner
   - Sort by date, popularity, etc.
4. User clicks on IP to view details

**Data Retrieved**:
- IP records from database (indexed from chain)
- Owner profiles
- Fractionalization status
- Marketplace listings (if any)

---

### 2.3 View IP Details
**Actor**: Any User  
**Goal**: View comprehensive details of a specific IP

**Flow**:
1. User navigates to IP detail page (`/ips/[dippChainId]`)
2. System displays:
   - IP metadata (title, description, category)
   - Story Protocol NFT link
   - Watermark verification info
   - Content versions (IPFS links)
   - Owner information
   - Registration date
   - Detection status
   - Fractionalization status
   - Royalty token address (if fractionalized)
   - Marketplace listings (if any)
   - Violations (if any)
   - Revenue distribution history
3. Owner sees additional actions:
   - Update watermark
   - Add content CID
   - Toggle detection
   - Fractionalize
   - Create marketplace listing

**Data Retrieved**:
- IP record from database
- On-chain data (from contracts)
- Fractionalization info
- Marketplace listings
- Violation records
- Revenue distribution records

---

### 2.4 Update IP Watermark
**Actor**: IP Owner  
**Goal**: Update watermark for IP protection

**Flow**:
1. Owner navigates to IP detail page
2. Clicks "Update Watermark"
3. Uploads new watermark file
4. File is uploaded to IPFS
5. Transaction is signed (IPRegistryAdapter.updateWatermark)
6. Watermark is updated on-chain
7. Database is updated

**Contract Interaction**: `IPRegistryAdapter.updateWatermark()`

---

### 2.5 Add Content Version
**Actor**: IP Owner  
**Goal**: Add new version/content CID to IP

**Flow**:
1. Owner navigates to IP detail page
2. Clicks "Add Content Version"
3. Uploads content file or enters IPFS CID
4. Transaction is signed (IPRegistryAdapter.addContentCID)
5. Content CID is added on-chain
6. Database is updated

**Contract Interaction**: `IPRegistryAdapter.addContentCID()`

---

### 2.6 Toggle AI Detection
**Actor**: IP Owner  
**Goal**: Enable/disable AI-powered violation detection

**Flow**:
1. Owner navigates to IP detail page
2. Toggles "AI Detection" switch
3. Transaction is signed (IPRegistryAdapter.enableDetection / disableDetection)
4. Detection status is updated on-chain
5. Database is updated

**Contract Interaction**: `IPRegistryAdapter.enableDetection()` / `disableDetection()`

---

## 3. IP Fractionalization

### 3.1 Fractionalize IP
**Actor**: IP Owner  
**Goal**: Convert IP into tradeable ERC-20 royalty tokens

**Flow**:
1. Owner navigates to IP detail page or `/fractionalize/[dippChainId]`
2. System checks if IP is already fractionalized
3. If not, owner sees fractionalization form:
   - Total supply (e.g., 1,000,000 tokens)
   - Token name (e.g., "My IP Token")
   - Token symbol (e.g., "MIPT")
   - Lock NFT option (transfer NFT to Fractionalizer)
4. Owner reviews and confirms
5. Owner approves NFT transfer (if locking)
6. Transaction is signed (Fractionalizer.fractionalize)
7. Royalty token contract is deployed
8. Tokens are minted to owner
9. Fractionalization is confirmed on-chain
10. Database is updated with royalty token address
11. Owner is redirected to IP detail page

**Data Stored**:
- Fractionalization record
- Royalty token contract address
- Total supply
- Token name/symbol
- NFT locked status
- Fractionalization timestamp

**Contract Interaction**: `Fractionalizer.fractionalize()`

---

### 3.2 View Fractionalization Status
**Actor**: Any User  
**Goal**: View fractionalization details for an IP

**Flow**:
1. User navigates to IP detail page
2. System displays fractionalization section:
   - Royalty token address
   - Total supply
   - Token name/symbol
   - Current holder distribution
   - NFT locked status
   - Link to view token on explorer

**Data Retrieved**:
- Fractionalization record from database
- On-chain token supply and holder data

---

## 4. Marketplace Operations

### 4.1 Create Marketplace Listing
**Actor**: Royalty Token Holder  
**Goal**: List fractional tokens for sale

**Flow**:
1. Holder navigates to IP detail page or marketplace
2. Clicks "Create Listing"
3. Fills listing form:
   - Token address (royalty token)
   - Amount to sell
   - Price per token (in ETH or ERC-20)
   - Payment token (native ETH or ERC-20 address)
   - Expiration date (optional)
   - Slippage tolerance
4. Holder approves token spending
5. Transaction is signed (IPMarketplace.createListing)
6. Listing is created on-chain
7. Database is updated
8. Listing appears in marketplace

**Data Stored**:
- Listing record
- Listing ID
- Seller address
- Token address
- Amount
- Price per token
- Payment token
- Expiration
- Status (active, sold, cancelled)
- Created timestamp

**Contract Interaction**: `IPMarketplace.createListing()`

---

### 4.2 Browse Marketplace
**Actor**: Any User  
**Goal**: Browse available token listings

**Flow**:
1. User navigates to Marketplace page
2. System displays paginated listings
3. User can:
   - Search by IP name, token symbol
   - Filter by price range, token, seller
   - Sort by price, date, popularity
4. User clicks listing to view details

**Data Retrieved**:
- Listing records from database
- IP metadata
- Seller profiles
- Token information

---

### 4.3 View Listing Details
**Actor**: Any User  
**Goal**: View detailed information about a listing

**Flow**:
1. User clicks on listing card
2. System displays:
   - IP information
   - Token details
   - Amount available
   - Price per token
   - Total price
   - Seller information
   - Expiration date
   - Slippage protection info
3. Buyer sees "Buy" button
4. Seller sees "Cancel" button

---

### 4.4 Buy Listing
**Actor**: Buyer  
**Goal**: Purchase fractional tokens from marketplace

**Flow**:
1. Buyer navigates to listing detail page
2. Buyer enters amount to buy (partial or full)
3. System calculates total price (with slippage protection)
4. Buyer reviews purchase details
5. Buyer approves payment (if ERC-20) or sends ETH
6. Transaction is signed (IPMarketplace.buyListing)
7. Purchase is executed on-chain:
   - Tokens transferred to buyer
   - Payment transferred to seller (minus fee)
   - Fee transferred to fee recipient
8. Listing is updated (amount reduced or marked sold)
9. Database is updated
10. Buyer receives tokens
11. Success notification shown

**Data Stored**:
- Purchase transaction record
- Updated listing status
- Buyer's token balance

**Contract Interaction**: `IPMarketplace.buyListing()`

---

### 4.5 Cancel Listing
**Actor**: Seller  
**Goal**: Cancel an active listing and recover tokens

**Flow**:
1. Seller navigates to listing detail or "My Listings" page
2. Clicks "Cancel Listing"
3. Transaction is signed (IPMarketplace.cancelListing)
4. Listing is cancelled on-chain
5. Tokens are returned to seller
6. Database is updated
7. Listing removed from marketplace

**Contract Interaction**: `IPMarketplace.cancelListing()`

---

### 4.6 View My Listings
**Actor**: Seller  
**Goal**: View all listings created by user

**Flow**:
1. User navigates to Profile or "My Listings" page
2. System displays all user's listings
3. User can filter by status (active, sold, cancelled)
4. User can cancel active listings

---

## 5. Revenue Distribution & Claims

### 5.1 Distribute Revenue
**Actor**: Revenue Distributor (IP Owner or Authorized)  
**Goal**: Distribute revenue to royalty token holders

**Flow**:
1. Distributor navigates to IP detail or Revenue page
2. Selects royalty token
3. Enters distribution amount (ETH or ERC-20)
4. Sends payment with transaction
5. Transaction is signed (RevenueDistributor.distributeRevenue)
6. Revenue is distributed on-chain
7. Distribution record is created
8. Token holders can now claim their share

**Data Stored**:
- Distribution record
- Distribution ID
- Token address
- Amount
- Payment token
- Distribution timestamp
- Claimable amounts per holder

**Contract Interaction**: `RevenueDistributor.distributeRevenue()`

---

### 5.2 Claim Revenue
**Actor**: Royalty Token Holder  
**Goal**: Claim proportional revenue share

**Flow**:
1. Holder navigates to Profile or Revenue page
2. System displays claimable distributions
3. Holder sees:
   - Distribution details
   - Claimable amount (based on token holdings)
   - Payment token
4. Holder clicks "Claim"
5. Transaction is signed (RevenueDistributor.claimRevenue)
6. Revenue is transferred to holder
7. Distribution is marked as claimed
8. Database is updated

**Data Stored**:
- Claim record
- Distribution ID
- Claimer address
- Amount claimed
- Claim timestamp

**Contract Interaction**: `RevenueDistributor.claimRevenue()`

---

### 5.3 View Revenue History
**Actor**: Token Holder  
**Goal**: View revenue distribution and claim history

**Flow**:
1. Holder navigates to Profile or Revenue page
2. System displays:
   - All distributions for held tokens
   - Claimed vs unclaimed amounts
   - Claim history
   - Total revenue earned

**Data Retrieved**:
- Distribution records
- Claim records
- Token holdings

---

## 6. Yield Vault Operations

### 6.1 Create Vault
**Actor**: Vault Creator (IP Owner or Authorized)  
**Goal**: Create a yield vault for a royalty token

**Flow**:
1. Creator navigates to IP detail or Yield page
2. Clicks "Create Vault"
3. Selects royalty token
4. Selects yield token (ERC-20 for yield rewards)
5. Transaction is signed (YieldVault.createVault)
6. Vault is created on-chain
7. Database is updated

**Data Stored**:
- Vault record
- Royalty token address
- Yield token address
- Vault status
- Created timestamp

**Contract Interaction**: `YieldVault.createVault()`

---

### 6.2 Stake Tokens
**Actor**: Token Holder  
**Goal**: Stake royalty tokens in yield vault

**Flow**:
1. Holder navigates to Yield Vault page
2. Selects vault
3. Enters stake amount
4. Approves token spending
5. Transaction is signed (YieldVault.stake)
6. Tokens are staked on-chain
7. Database is updated
8. Holder starts earning yield

**Data Stored**:
- Stake record
- Staker address
- Amount staked
- Stake timestamp
- Vault address

**Contract Interaction**: `YieldVault.stake()`

---

### 6.3 Unstake Tokens
**Actor**: Staker  
**Goal**: Unstake tokens from yield vault

**Flow**:
1. Staker navigates to Yield Vault page
2. Views staked amount
3. Enters unstake amount
4. Transaction is signed (YieldVault.unstake)
5. Tokens are unstaked (subject to minimum duration)
6. Database is updated

**Contract Interaction**: `YieldVault.unstake()`

---

### 6.4 Claim Yield
**Actor**: Staker  
**Goal**: Claim accumulated yield rewards

**Flow**:
1. Staker navigates to Yield Vault page
2. Views pending yield
3. Clicks "Claim Yield"
4. Transaction is signed (YieldVault.claimYield)
5. Yield is transferred to staker
6. Database is updated

**Contract Interaction**: `YieldVault.claimYield()`

---

### 6.5 Deposit Yield
**Actor**: Yield Depositor (Authorized)  
**Goal**: Deposit yield tokens into vault for distribution

**Flow**:
1. Depositor navigates to Yield Vault page
2. Selects vault
3. Enters deposit amount
4. Approves yield token spending
5. Transaction is signed (YieldVault.depositYield)
6. Yield tokens are deposited
7. Yield is distributed to stakers proportionally
8. Database is updated

**Contract Interaction**: `YieldVault.depositYield()`

---

## 7. IP Violation Management

### 7.1 Report Violation (AI Engine)
**Actor**: AI Engine (Automated)  
**Goal**: Report detected IP violations

**Flow**:
1. AI engine detects potential violation
2. System calls IPEnforcer.reportViolation
3. Violation is recorded on-chain
4. Database is updated
5. IP owner is notified
6. Violation appears in violations dashboard

**Data Stored**:
- Violation record
- Violation ID
- IP address (DippChain ID)
- Similarity score
- Evidence CID (IPFS)
- Violation URL
- Reporter address (AI engine)
- Status (pending, accepted, challenged, resolved, dismissed)
- Reported timestamp

**Contract Interaction**: `IPEnforcer.reportViolation()` (AI Engine role)

---

### 7.2 View Violations
**Actor**: Any User  
**Goal**: Browse IP violations

**Flow**:
1. User navigates to Violations page
2. System displays paginated violations
3. User can:
   - Filter by status, IP, reporter
   - Search by IP name
   - Sort by date, similarity score
4. User clicks violation to view details

**Data Retrieved**:
- Violation records from database
- IP metadata
- Evidence links

---

### 7.3 View Violation Details
**Actor**: Any User  
**Goal**: View detailed violation information

**Flow**:
1. User clicks on violation
2. System displays:
   - IP information
   - Similarity score
   - Evidence (IPFS link)
   - Violation URL
   - Reporter information
   - Status and timeline
   - Resolution details (if resolved)
3. IP owner sees action buttons:
   - Accept violation
   - Challenge violation

---

### 7.4 Accept Violation
**Actor**: IP Owner  
**Goal**: Accept a reported violation

**Flow**:
1. Owner navigates to violation detail page
2. Reviews violation evidence
3. Clicks "Accept Violation"
4. Transaction is signed (IPEnforcer.acceptViolation)
5. Violation is marked as accepted on-chain
6. Database is updated
7. Violation status changes to "Accepted"

**Contract Interaction**: `IPEnforcer.acceptViolation()`

---

### 7.5 Challenge Violation
**Actor**: IP Owner  
**Goal**: Challenge a reported violation

**Flow**:
1. Owner navigates to violation detail page
2. Reviews violation evidence
3. Clicks "Challenge Violation"
4. Optionally uploads counter-evidence
5. Transaction is signed (IPEnforcer.challengeViolation)
6. Violation is marked as challenged on-chain
7. Database is updated
8. Violation status changes to "Challenged"
9. Verifier/resolver can now review

**Contract Interaction**: `IPEnforcer.challengeViolation()`

---

### 7.6 Resolve Violation (Verifier)
**Actor**: Verifier (Authorized Role)  
**Goal**: Resolve a challenged violation

**Flow**:
1. Verifier navigates to violation detail page
2. Reviews violation and challenge
3. Clicks "Resolve Violation"
4. Selects resolution (valid/invalid)
5. Transaction is signed (IPEnforcer.resolveViolation)
6. Violation is resolved on-chain
7. Database is updated
8. Violation status changes to "Resolved"

**Contract Interaction**: `IPEnforcer.resolveViolation()` (Verifier role)

---

### 7.7 Dismiss Violation (Resolver)
**Actor**: Resolver (Authorized Role)  
**Goal**: Dismiss a violation

**Flow**:
1. Resolver navigates to violation detail page
2. Reviews violation
3. Clicks "Dismiss Violation"
4. Transaction is signed (IPEnforcer.dismissViolation)
5. Violation is dismissed on-chain
6. Database is updated
7. Violation status changes to "Dismissed"

**Contract Interaction**: `IPEnforcer.dismissViolation()` (Resolver role)

---

## 8. DAO Governance

### 8.1 Create Proposal
**Actor**: Governance Token Holder  
**Goal**: Create a governance proposal for an IP

**Flow**:
1. Holder navigates to IP detail or Governance page
2. Clicks "Create Proposal"
3. Fills proposal form:
   - Proposal type (metadata update, revenue split, etc.)
   - Title
   - Description
   - Actions (if any)
4. Transaction is signed (IPDAO.createProposal)
5. Proposal is created on-chain
6. Database is updated
7. Proposal appears in governance dashboard

**Data Stored**:
- Proposal record
- Proposal ID
- IP address (DippChain ID)
- Proposal type
- Creator address
- Title, description
- Status (pending, active, succeeded, defeated, executed)
- Created timestamp
- Voting period

**Contract Interaction**: `IPDAO.createProposal()`

---

### 8.2 View Proposals
**Actor**: Any User  
**Goal**: Browse governance proposals

**Flow**:
1. User navigates to Governance page
2. System displays paginated proposals
3. User can:
   - Filter by status, IP, type
   - Search by title
   - Sort by date, votes
4. User clicks proposal to view details

**Data Retrieved**:
- Proposal records from database
- IP metadata
- Voting data
- Creator profiles

---

### 8.3 View Proposal Details
**Actor**: Any User  
**Goal**: View detailed proposal information

**Flow**:
1. User clicks on proposal
2. System displays:
   - Proposal information
   - IP information
   - Creator information
   - Current vote counts (for, against, abstain)
   - Voting period
   - Status
   - Execution status
3. Token holder sees "Vote" button

---

### 8.4 Vote on Proposal
**Actor**: Governance Token Holder  
**Goal**: Vote on a governance proposal

**Flow**:
1. Holder navigates to proposal detail page
2. Views proposal details and current votes
3. Selects vote option (for, against, abstain)
4. Transaction is signed (IPDAO.castVote)
5. Vote is recorded on-chain
6. Database is updated
7. Vote counts are updated
8. Success notification shown

**Data Stored**:
- Vote record
- Proposal ID
- Voter address
- Vote choice (for, against, abstain)
- Voting power (token amount)
- Vote timestamp

**Contract Interaction**: `IPDAO.castVote()`

---

### 8.5 Execute Proposal
**Actor**: Any User (after voting period)  
**Goal**: Execute a successful proposal

**Flow**:
1. User navigates to proposal detail page
2. Proposal has succeeded (passed quorum and majority)
3. User clicks "Execute Proposal"
4. Transaction is signed (IPDAO.execute)
5. Proposal actions are executed on-chain
6. Database is updated
7. Proposal status changes to "Executed"

**Contract Interaction**: `IPDAO.execute()`

---

## 9. Dashboard & Analytics

### 9.1 User Dashboard
**Actor**: User  
**Goal**: View comprehensive overview of user's activity

**Flow**:
1. User navigates to Dashboard or Profile page
2. System displays:
   - Statistics cards:
     - Total IPs owned
     - Total tokens held
     - Active listings
     - Total revenue earned
     - Pending claims
   - Recent activity feed
   - Quick actions
   - Portfolio overview

**Data Retrieved**:
- User's IPs
- Token holdings
- Listings
- Revenue distributions
- Violations
- Proposals

---

### 9.2 IP Portfolio
**Actor**: User  
**Goal**: View all IPs owned by user

**Flow**:
1. User navigates to Profile or "My IPs" page
2. System displays:
   - Grid/list of owned IPs
   - IP status (registered, fractionalized, listed)
   - Quick stats per IP
3. User can filter and sort
4. User clicks IP to view details

---

### 9.3 Token Portfolio
**Actor**: User  
**Goal**: View all royalty tokens held by user

**Flow**:
1. User navigates to Profile or "My Tokens" page
2. System displays:
   - List of held tokens
   - Token balances
   - IP information for each token
   - Current value estimates
   - Staked amounts (if any)
3. User can click token to view IP details

---

## 10. Search & Discovery

### 10.1 Search IPs
**Actor**: Any User  
**Goal**: Search for IP assets

**Flow**:
1. User enters search query in search bar
2. System searches:
   - IP titles
   - Descriptions
   - Owner addresses
   - Token symbols
3. Results are displayed
4. User can filter results
5. User clicks result to view details

---

### 10.2 Browse by Category
**Actor**: Any User  
**Goal**: Browse IPs by category

**Flow**:
1. User navigates to Explore page
2. User selects category filter
3. System displays IPs in that category
4. User can further filter and sort

---

## 11. Notifications & Alerts

### 11.1 View Notifications
**Actor**: User  
**Goal**: View system notifications

**Flow**:
1. User clicks notification bell
2. System displays notifications:
   - Violation reports
   - Revenue distributions
   - Proposal updates
   - Listing purchases
   - Governance votes
3. User can mark as read
4. User can click to navigate to relevant page

**Data Stored**:
- Notification records
- User address
- Notification type
- Related entity ID
- Read status
- Created timestamp

---

## 12. Admin Functions

### 12.1 Grant Roles (Admin)
**Actor**: Contract Owner/Admin  
**Goal**: Grant roles in IPEnforcer

**Flow**:
1. Admin navigates to admin page
2. Selects role to grant (AI_ENGINE_ROLE, VERIFIER_ROLE, RESOLVER_ROLE)
3. Enters address
4. Transaction is signed (IPEnforcer.grantRole)
5. Role is granted on-chain
6. Database is updated

**Contract Interaction**: `IPEnforcer.grantRole()`

---

### 12.2 Update Marketplace Fee (Admin)
**Actor**: Contract Owner  
**Goal**: Update marketplace fee percentage

**Flow**:
1. Owner navigates to admin page
2. Updates fee percentage
3. Transaction is signed (IPMarketplace.updateMarketplaceFee)
4. Fee is updated on-chain

**Contract Interaction**: `IPMarketplace.updateMarketplaceFee()`

---

### 12.3 Update Fee Recipient (Admin)
**Actor**: Contract Owner  
**Goal**: Update marketplace fee recipient address

**Flow**:
1. Owner navigates to admin page
2. Updates fee recipient address
3. Transaction is signed (IPMarketplace.updateFeeRecipient)
4. Fee recipient is updated on-chain

**Contract Interaction**: `IPMarketplace.updateFeeRecipient()`

---

## Summary

**Total Use Cases**: 50+  
**Primary Actors**: 
- Creators/Owners
- Buyers/Traders
- Token Holders
- AI Engine (automated)
- Verifiers/Resolvers
- Admins

**Key Flows**:
1. **Registration Flow**: Connect Wallet → Register IP → Fractionalize → List on Marketplace
2. **Trading Flow**: Browse Marketplace → Buy Tokens → Claim Revenue
3. **Protection Flow**: Enable Detection → Monitor Violations → Accept/Challenge → Resolve
4. **Governance Flow**: Create Proposal → Vote → Execute
5. **Yield Flow**: Create Vault → Stake → Deposit Yield → Claim Yield

All use cases must be supported by:
- **Frontend**: React components in `dippchain-studio/src/pages/`
- **API Routes**: Next.js API routes in `dippchain-studio/src/pages/api/`
- **Database**: Prisma schema in `dippchain-studio/prisma/schema.prisma`
- **Contract Integration**: Hooks in `dippchain-studio/src/hooks/`
- **Indexer**: Background service to sync on-chain events to database
