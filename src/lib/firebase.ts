import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// SERVER-ONLY. Never import this file from a client component ("use client").
//
// Get these three values from Firebase Console → Project Settings →
// Service Accounts → Generate new private key (downloads a JSON file).
// Add to .env.local:
//   FIREBASE_PROJECT_ID=your-project-id
//   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
//   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
//
// Important: keep the private key wrapped in quotes in .env.local so the
// \n sequences survive — we unescape them below.
function getAdminApp(): App {
  if (getApps().length) return getApps()[0]

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export const adminDb = getFirestore(getAdminApp())