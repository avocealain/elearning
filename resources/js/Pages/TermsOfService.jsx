import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function TermsOfService() {
    return (
        <PublicLayout>
            <Head title="Conditions d'Utilisation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
                            
                            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptation des conditions</h2>
                                    <p>
                                        En accédant à ce site web, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et règlements applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Licence d'utilisation</h2>
                                    <p>
                                        Il est permis de télécharger temporairement une copie du matériel (information ou logiciel) sur le site web d'E-Learning pour une visualisation transitoire personnelle et non commerciale uniquement. Il s'agit de l'octroi d'une licence, non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :
                                    </p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Modifier ou copier le matériel ;</li>
                                        <li>Utiliser le matériel à des fins commerciales ou pour toute exposition publique (commerciale ou non commerciale) ;</li>
                                        <li>Tenter de décompiler ou de faire de l'ingénierie inverse de tout logiciel contenu sur le site web d'E-Learning ;</li>
                                        <li>Supprimer tout droit d'auteur ou autre mention de propriété du matériel ; ou</li>
                                        <li>Transférer le matériel à une autre personne ou "miroir" du matériel sur un autre serveur.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Clause de non-responsabilité</h2>
                                    <p>
                                        Le matériel sur le site web d'E-Learning est fourni "tel quel". E-Learning ne donne aucune garantie, expresse ou implicite, et rejette par la présente toutes les autres garanties, y compris, sans limitation, les garanties implicites ou conditions de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de propriété intellectuelle ou autre violation des droits.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Limitations</h2>
                                    <p>
                                        En aucun cas E-Learning ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'incapacité d'utiliser le matériel sur le site web d'E-Learning, même si E-Learning ou un représentant autorisé d'E-Learning a été notifié oralement ou par écrit de la possibilité de tels dommages.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Révisions et errata</h2>
                                    <p>
                                        Le matériel apparaissant sur le site web d'E-Learning pourrait inclure des erreurs techniques, typographiques ou photographiques. E-Learning ne garantit pas que l'un des matériaux sur son site web est exact, complet ou à jour. E-Learning peut apporter des modifications au matériel contenu sur son site web à tout moment sans préavis.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
