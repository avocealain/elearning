import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Help() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Général' },
        { id: 'student', label: 'Étudiants' },
        { id: 'instructor', label: 'Instructeurs' },
        { id: 'account', label: 'Compte & Support' },
    ];

    return (
        <PublicLayout>
            <Head title="Centre d'Aide" />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                            Comment pouvons-nous vous aider ?
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                            Guide complet pour maîtriser la plateforme E-Learning
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sticky top-24">
                                <nav className="flex flex-col">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-6 py-4 text-left font-medium text-sm transition-colors duration-200 ${
                                                activeTab === tab.id
                                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700 dark:bg-gray-700 dark:text-white'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 border-l-4 border-transparent'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-8">
                            
                            {/* GENERAL SECTION */}
                            {activeTab === 'general' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bienvenue sur E-Learning</h2>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            Notre plateforme est conçue pour offrir une expérience d'apprentissage fluide et interactive. 
                                            Que vous soyez ici pour apprendre de nouvelles compétences ou pour enseigner, ce guide vous accompagnera 
                                            dans toutes vos démarches.
                                        </p>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Navigation</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                            <li><strong>Accueil :</strong> Vue d'ensemble des fonctionnalités et accès rapide aux cours populaires.</li>
                                            <li><strong>Cours :</strong> Catalogue complet de toutes les formations disponibles, filtrables par catégories.</li>
                                            <li><strong>Tableau de bord :</strong> Votre espace personnel pour suivre votre progression (nécessite une connexion).</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* STUDENT SECTION */}
                            {activeTab === 'student' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Guide de l'Étudiant</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            Tout ce que vous devez savoir pour suivre vos cours et réussir vos certifications.
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">1. Inscription aux Cours</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                Naviguez vers la page "Cours", choisissez une formation qui vous intéresse et cliquez sur "S'inscrire". 
                                                Une fois inscrit, le cours apparaîtra immédiatement dans votre tableau de bord.
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">2. Suivi des Leçons</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                Chaque cours est divisé en modules et leçons.
                                                <ul className="list-disc pl-5 mt-2">
                                                    <li>Utilisez le lecteur vidéo pour suivre le contenu.</li>
                                                    <li>Téléchargez les ressources jointes (PDF, code source) sous la vidéo.</li>
                                                    <li>Cliquez sur "Marquer comme terminé" pour valider une leçon et passer à la suivante.</li>
                                                </ul>
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">3. Devoirs et Quiz</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                Certains modules nécessitent la soumission de travaux pratiques.
                                                Téléchargez votre travail via le formulaire de soumission. Vos instructeurs noteront votre travail 
                                                et vous recevrez une notification une fois la correction disponible.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* INSTRUCTOR SECTION */}
                            {activeTab === 'instructor' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Espace Instructeur</h2>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Partagez votre expertise avec le monde. Voici comment gérer vos cours.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-gray-700 p-4">
                                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                            <strong>Note :</strong> L'accès instructeur est soumis à validation par l'administration.
                                        </p>
                                    </div>

                                    <div className="space-y-6 mt-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Création de Cours</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                Depuis votre tableau de bord instructeur, cliquez sur "Nouveau Cours". Remplissez les détails : titre, description, image de couverture et prérequis.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gestion du Contenu</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                Organisez votre cours en <strong>Modules</strong> (ex: Introduction, Chapitre 1) et ajoutez des <strong>Leçons</strong> (Vidéos, Texe). Vous pouvez également ajouter des fichiers joints à chaque leçon.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ACCOUNT SECTION */}
                            {activeTab === 'account' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gestion de Compte</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profil & Sécurité</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                Mettez à jour vos informations personnelles, changez votre mot de passe ou activez l'authentification à deux facteurs depuis la page Profil.
                                            </p>
                                            <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">
                                                Gérer mon profil &rarr;
                                            </Link>
                                        </div>

                                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Support Technique</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                Vous rencontrez un problème technique ? Une erreur sur la plateforme ?
                                            </p>
                                            <div className="flex flex-col space-y-2">
                                                <a href="mailto:digitobenin@gmail.com" className="text-indigo-600 hover:text-indigo-500 font-medium text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    digitobenin@gmail.com
                                                </a>
                                                <a href="https://wa.me/2290152544387" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-500 font-medium text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                                    WhatsApp : +229 0152544387
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
