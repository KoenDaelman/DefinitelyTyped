// Type definitions for stripe-v3 3.1
// Project: https://stripe.com/
// Definitions by: Andy Hawkins <https://github.com/a904guy/,http://a904guy.com>
//                 Eric J. Smith <https://github.com/ejsmith>
//                 Amrit Kahlon <https://github.com/amritk>
//                 Adam Cmiel <https://github.com/adamcmiel>
//                 Justin Leider <https://github.com/jleider>
//                 Kamil Gałuszka <https://github.com/galuszkak>
//                 Stefan Langeder <https://github.com/slangeder>
//                 Marlos Borges <https://github.com/marlosin>
//                 Thomas Marek <https://github.com/ttmarek>
//                 Kim Ehrenpohl <https://github.com/kimehrenpohl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var Stripe: stripe.StripeStatic;

declare namespace stripe {

    interface StripeStatic {
        (publicKey: string): Stripe;

        version: number;
    }

    interface Stripe {
        elements(options?: elements.ElementsCreateOptions): elements.Elements;
        handleCardSetup(
            clientSecret: string,
            element: elements.Element,
            data: HandleCardSetupOptions
        ): Promise<SetupIntentResponse>;
        handleCardPayment(
            clientSecret: string,
            element: elements.Element,
            options?: HandleCardPaymentOptions
        ): Promise<PaymentIntentResponse>;
        handleCardPayment(
            clientSecret: string,
            options?: HandleCardPaymentWithoutElementsOptions
        ): Promise<PaymentIntentResponse>;

    }

    interface HandleCardSetupOptions {
        /**
         * Use this parameter to supply additional data relevant to
         * the payment method, such as billing details.
         */
        payment_method_data?: {
            /**
             * The billing details associated with the card. [Recommended]
             */
            billing_details?: BillingDetails,
        };
    }

    interface BillingDetailsAddress {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
    }

    interface BillingDetails {
        address?: BillingDetailsAddress;
        email?: string;
        name?: string;
        phone?: string;
    }

    interface ShippingDetailsAddress {
        line1: string;
        city?: string;
        country?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
    }

    interface ShippingDetails {
        address: ShippingDetailsAddress;
        name: string;
        carrier: string;
        phone: string;
        tracking_number: string;
    }

    interface CreatePaymentMethodOptions {
        /**
         * Billing information associated with the PaymentMethod
         * that may be used or required by particular types of
         * payment methods.
         */
        billing_details?: BillingDetails;
        metadata?: Metadata;
    }

    interface HandleCardPaymentOptions {
        /**
         * Use this parameter to supply additional data relevant to
         * the payment method, such as billing details
         */
        payment_method_data?: {
            /**
             * The billing details associated with the card. [Recommended]
             */
            billing_details?: BillingDetails,
        };
        /**
         * The shipping details for the payment, if collected. [Recommended]
         */
        shipping?: ShippingDetails;
        /**
         * Email address that the receipt for the resulting payment will be sent to.
         */
        receipt_email?: string;
        /**
         * If the PaymentIntent is associated with a customer and this parameter
         * is set to true, the provided payment method will be attached to the
         * customer. Default is false.
         */
        save_payment_method?: boolean;
    }

    interface HandleCardPaymentWithoutElementsOptions extends HandleCardPaymentOptions {
        /**
         * Only one of payment_method_data and payment_method is required.
         * Use payment_method to specify an existing PaymentMethod to use
         * for this payment.
         */
        payment_method?: string;
        /**
         * Use this parameter to supply additional data relevant to
         * the payment method, such as billing details
         */
        payment_method_data?: {
            /**
             * The billing details associated with the card. [Recommended]
             */
            billing_details?: BillingDetails,
            card?: {
                /**
                 * Converts the provided token into a PaymentMethod to
                 * use for the payment.
                 */
                token: string;
            }
        };
    }

    interface PaymentIntentResponse {
        paymentIntent?: paymentIntents.PaymentIntent;
        error?: Error;
    }

    interface SetupIntentResponse {
        setupIntent?: setupIntents.SetupIntent;
        error?: Error;
    }

    interface Metadata {
        [x: string]: string;
    }

    interface List<T> {
        /**
         * Value is 'list'
         */
        object: 'list';

        /**
         * An array containing the actual response elements, paginated by any request parameters.
         */
        data: T[];

        /**
         * Whether or not there are more elements available after this set. If false, this set comprises the end of the list.
         */
        has_more: boolean;

        /**
         * The URL for accessing this list.
         */
        url: string;
    }

    interface OwnerAddress {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
    }

    interface OwnerInfo {
        address?: OwnerAddress;
        name?: string;
        email?: string;
        phone?: string;
    }

    interface Source {
        client_secret: string;
        created: number;
        currency: string;
        id: string;
        owner: {
            address: OwnerAddress;
            email: string;
            name: string;
            phone: string;
            verified_address: string;
            verified_email: string;
            verified_name: string;
            verified_phone: string;
        };
        sepa_debit?: {
            bank_code: string;
            country: string;
            fingerprint: string;
            last4: string;
            mandate_reference: string;
        };
        card?: Card;
        status?: string;
        redirect?: {
            status: string;
            url: string;
        };
        three_d_secure?: {
            authenticated: boolean;
        };
    }

    type brandType = 'Visa' | 'American Express' | 'MasterCard' | 'Discover' | 'JCB' | 'Diners Club' | 'Unknown';
    type checkType = 'pass' | 'fail' | 'unavailable' | 'unchecked';
    type fundingType = 'credit' | 'debit' | 'prepaid' | 'unknown';
    type tokenizationType = 'apple_pay' | 'android_pay';
    interface Card {
        id: string;
        object: string;
        address_city?: string;
        address_country?: string;
        address_line1?: string;
        address_line1_check?: checkType;
        address_line2?: string;
        address_state?: string;
        address_zip?: string;
        address_zip_check?: checkType;
        brand: brandType;
        country: string;
        currency?: string;
        cvc_check?: checkType;
        dynamic_last4: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
        funding: fundingType;
        last4: string;
        metadata: any;
        name?: string;
        tokenization_method?: tokenizationType;
        three_d_secure?: 'required' | 'recommended' | 'optional' | 'not_supported';
    }

    interface RetrieveSourceOptions {
        id: string;
        client_secret: string;
    }


    type ErrorType = 'api_connection_error'
        | 'api_error'
        | 'authentication_error'
        | 'card_error'
        | 'idempotency_error'
        | 'invalid_request_error'
        | 'rate_limit_error';

    interface Error {
        /**
         * The type of error returned.
         */
        type: ErrorType;

        /**
         * For card errors, the ID of the failed charge.
         */
        charge: string;

        /**
         * For some errors that could be handled programmatically,
         * a short string indicating the error code reported.
         */
        code?: string;

        /**
         * For card errors resulting from a card issuer decline,
         * a short string indicating the card issuer’s reason for
         * the decline if they provide one.
         */
        decline_code?: string;

        /**
         * A URL to more information about the error code reported.
         */
        doc_url?: string;

        /**
         * A human-readable message providing more details about the
         * error. For card errors, these messages can be shown to
         * your users.
         */
        message?: string;

        /**
         * If the error is parameter-specific, the parameter related
         * to the error. For example, you can use this to display a
         * message near the correct form field.
         */
        param?: string;

        /**
         * The PaymentIntent object for errors returned on a request
         * involving a PaymentIntent.
         */
        payment_intent?: paymentIntents.PaymentIntent;

        /**
         * The PaymentMethod object for errors returned on a
         * request involving a PaymentMethod.
         */
        payment_method?: paymentMethod.PaymentMethod;

        /**
         * The source object for errors returned on a request involving
         * a source.
         */
        source?: Source;
    }




    // Container for all elements related types
    namespace elements {

        interface ElementsCreateOptions {
            fonts?: Font[];
            locale?: string;
        }

        type handler = (response?: ElementChangeResponse) => void;
        type eventTypes = 'blur' | 'change' | 'focus' | 'ready';
        interface Element {
            mount(domElement: any): void;
            on(event: eventTypes, handler: handler): void;
            // on(event: 'click', handler: (response: { preventDefault: () => void }) => void): void;
            focus(): void;
            blur(): void;
            clear(): void;
            unmount(): void;
            destroy(): void;
            update(options: ElementsOptions): void;
        }

        interface ElementChangeResponse {
            elementType: string;
            brand: string;
            complete: boolean;
            empty: boolean;
            value?: { postalCode: string | number } | string;
            country?: string;
            bankName?: string;
            error?: Error;
        }

        type elementsType = 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' | 'postalCode' | 'paymentRequestButton' | 'iban' | 'idealBank';
        interface Elements {
            create(type: elementsType, options?: ElementsOptions): Element;
        }

        interface ElementsOptions {
            classes?: {
                base?: string;
                complete?: string;
                empty?: string;
                focus?: string;
                invalid?: string;
                webkitAutofill?: string;
            };
            hidePostalCode?: boolean;
            hideIcon?: boolean;
            iconStyle?: 'solid' | 'default';
            placeholder?: string;
            placeholderCountry?: string;
            style?: {
                base?: Style;
                complete?: Style;
                empty?: Style;
                invalid?: Style;
                paymentRequestButton?: PaymentRequestButtonStyleOptions;
            };
            value?: string | { [objectKey: string]: string; };
            // paymentRequest?: paymentRequest.StripePaymentRequest;
            paymentRequest?: any;
            supportedCountries?: string[];
            disabled?: boolean;
        }

        interface Style extends StyleOptions {
            ':hover'?: StyleOptions;
            ':focus'?: StyleOptions;
            '::placeholder'?: StyleOptions;
            '::selection'?: StyleOptions;
            ':-webkit-autofill'?: StyleOptions;
            ':disabled'?: StyleOptions;
            '::-ms-clear'?: StyleOptions;
        }

        interface Font {
            family?: string;
            src?: string;
            display?: string;
            style?: string;
            unicodeRange?: string;
            weight?: string;
            cssSrc?: string;
        }

        interface StyleOptions {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontSmoothing?: string;
            fontStyle?: string;
            fontVariant?: string;
            fontWeight?: string | number;
            iconColor?: string;
            lineHeight?: string;
            letterSpacing?: string;
            textAlign?: string;
            textDecoration?: string;
            textShadow?: string;
            textTransform?: string;
        }

        interface PaymentRequestButtonStyleOptions {
            type?: 'default' | 'donate' | 'buy';
            theme: 'dark' | 'light' | 'light-outline';
            height: string;
        }


    }











    namespace setupIntents {

        type SetupIntentCancelationReason = 'abandoned'
            | 'requested_by_customer'
            | 'duplicate';

        type SetupIntentStatus = 'requires_payment_method'
            | 'requires_confirmation'
            | 'requires_action'
            | 'processing'
            | 'canceled'
            | 'succeeded';

        interface SetupIntentNextActionRedirectToUrl {
            /**
             * Type of the next action to perform
             */
            type: 'redirect_to_url';
            /**
             * Contains instructions for authenticating a payment by
             * redirecting your customer to another page or application.
             */
            redirect_to_url: {
                /**
                 * If the customer does not exit their browser while
                 * authenticating, they will be redirected to this
                 * specified URL after completion.
                 */
                return_url: string;

                /**
                 * The URL you must redirect your customer to in
                 * order to authenticate.
                 */
                url: string;
            };
        }

        interface SetupIntentNextActionUseStripeSdk {
            /**
             * Type of the next action to perform
             */
            type: 'use_stripe_sdk';
            /**
             * When confirming a SetupIntent with Stripe.js, Stripe.js depends on
             * the contents of this dictionary to invoke authentication flows. The
             * shape of the contents is subject to change and is only intended to
             * be used by Stripe.js.
             */
            use_stripe_sdk: any;
        }

        interface SetupIntent {
            /**
             * Unique identifier for the object.
             */
            id: string;

            /**
             * Value is "setup_intent".
             */
            object: 'setup_intent';

            /**
             * ID of the Connect application that created the SetupIntent.
             */
            application: string;

            /**
             * Reason for cancellation of this SetupIntent.
             */
            cancelation_reason: SetupIntentCancelationReason;

            /**
             * The client secret of this SetupIntent. Used for client-side retrieval using a publishable key.
             * The client secret can be used to complete payment setup from your frontend.
             * It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer.
             * Make sure that you have TLS enabled on any page that includes the client secret.
             */
            client_secret: string;

            /**
             * Time at which the object was created. Measured in seconds since the Unix epoch.
             */
            created: number;

            /**
             * ID of the Customer this SetupIntent belongs to, if one exists.
             * If present, payment methods used with this SetupIntent can only be attached
             * to this Customer, and payment methods attached to other Customers cannot be
             * used with this SetupIntent.
             */
            customer: string;

            /**
             * An arbitrary string attached to the object. Often useful for displaying to users.
             */
            description?: string;

            /**
             * The error encountered in the previous SetupIntent confirmation.
             */
            last_payment_error: Error;

            /**
             * Has the value true if the object exists in live mode or the value
             * false if the object exists in test mode.
             */
            livemode: boolean;

            /**
             * Set of key-value pairs that you can attach to an object. This can be
             * useful for storing additional information about the object in a structured format.
             */
            metadata: Metadata;

            /**
             * If present, this property tells you what actions you need to take in
             * order for your customer to continue payment setup.
             */
            next_action: SetupIntentNextActionUseStripeSdk | SetupIntentNextActionRedirectToUrl;

            /**
             * The account (if any) for which the setup is intended.
             */
            on_behalf_of: string;

            /**
             * ID of the payment method used with this SetupIntent.
             */
            payment_method: string;

            /**
             * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up.
             */
            payment_method_types: string[];

            /**
             * Status of this SetupIntent
             */
            status: SetupIntentStatus;

            /**
             * Indicates how the payment method is intended to be used in the future.
             * Use on_session if you intend to only reuse the payment method
             * when the customer is in your checkout flow. Use off_session if your
             * customer may or may not be in your checkout flow. If not provided,
             * this value defaults to off_session.
             */
            usage: 'on_session' | 'off_session';
        }


    }   // end namespace setupIntents

    namespace paymentIntents {

        type PaymentIntentStatus = 'requires_payment_method'
            | 'requires_confirmation'
            | 'requires_action'
            | 'processing'
            | 'requires_capture'
            | 'canceled'
            | 'succeeded';

        type PaymentIntentCancelationReason = 'duplicate'
            | 'fraudulent'
            | 'requested_by_customer'
            | 'abandoned'
            // Generated by Stripe internally:
            | 'failed_invoice'
            | 'void_invoice'
            | 'automatic';

        interface PaymentIntentNextActionRedirectToUrl {
            /**
             * Type of the next action to perform
             */
            type: 'redirect_to_url';
            /**
             * Contains instructions for authenticating a payment by
             * redirecting your customer to another page or application.
             */
            redirect_to_url: {
                /**
                 * If the customer does not exit their browser while
                 * authenticating, they will be redirected to this
                 * specified URL after completion.
                 */
                return_url: string;

                /**
                 * The URL you must redirect your customer to in
                 * order to authenticate the payment.
                 */
                url: string;
            };
        }

        interface PaymentIntentNextActionUseStripeSdk {
            /**
             * Type of the next action to perform
             */
            type: 'use_stripe_sdk';
            /**
             * When confirming a PaymentIntent with Stripe.js,
             * Stripe.js depends on the contents of this dictionary
             * to invoke authentication flows. The shape of the contents
             * is subject to change and is only intended to be used by Stripe.js.
             */
            use_stripe_sdk: any;
        }

        interface PaymentIntent {
            /**
             * Unique identifier for the object.
             */
            id: string;

            /**
             * Value is "payment_intent".
             */
            object: 'payment_intent';

            /**
             * The amount in cents that is to be collected from this PaymentIntent.
             */
            amount: number;

            /**
             * The amount that can be captured with from this PaymentIntent (in cents).
             */
            amount_capturable: number;

            /**
             * The amount that was collected from this PaymentIntent (in cents).
             */
            amount_received: number;

            /**
             * ID of the Connect application that created the PaymentIntent.
             */
            application: string;

            /**
             * A fee in cents that will be applied to the invoice and transferred to the application owner's Stripe account.
             */
            application_fee_amount: number;

            /**
             * Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled.
             * Measured in seconds since the Unix epoch.
             */
            canceled_at: number;

            /**
             * User-given reason for cancellation of this PaymentIntent.
             */
            cancelation_reason: PaymentIntentCancelationReason;

            /**
             * Capture method of this PaymentIntent.
             */
            capture_method: 'automatic' | 'manual';

            /**
             * Charges that were created by this PaymentIntent, if any.
             */
            charges: List<Charge>;

            /**
             * The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key. Please refer to dynamic authentication guide on how client_secret should be handled.
             */
            client_secret: string;

            /**
             * Confirmation method of this PaymentIntent.
             */
            confirmation_method: 'automatic' | 'manual';

            /**
             * Time at which the object was created. Measured in seconds since the Unix epoch.
             */
            created: number;

            /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             */
            currency: string;

            /**
             * ID of the Customer this PaymentIntent is for if one exists.
             */
            customer: string;

            /**
             * An arbitrary string attached to the object. Often useful for displaying to users.
             */
            description?: string;

            /**
             * The payment error encountered in the previous PaymentIntent confirmation.
             */
            last_payment_error: Error;

            /**
             * Has the value true if the object exists in live mode or the value false
             * if the object exists in test mode.
             */
            livemode: boolean;

            metadata: Metadata;

            /**
             * If present, this property tells you what actions you need to take in order
             * for your customer to fulfill a payment using the provided source.
             */
            next_action: PaymentIntentNextActionUseStripeSdk | PaymentIntentNextActionRedirectToUrl;

            /**
             * The account (if any) for which the funds of the PaymentIntent are intended.
             * See the PaymentIntents Connect usage guide for details.
             */
            on_behalf_of: string;

            /**
             * The list of payment method types (e.g. card) that this PaymentIntent is allowed to use.
             */
            payment_method_types: string[];

            /**
             * Email address that the receipt for the resulting payment will be sent to.
             */
            receipt_email: string;

            /**
             * ID of the review associated with this PaymentIntent, if any.
             */
            review: string;

            /**
             * Shipping information for this PaymentIntent.
             */
            shipping: ShippingDetails;

            /**
             * Extra information about a PaymentIntent. This will appear on your
             * customer’s statement when this PaymentIntent succeeds in creating a charge.
             */
            statement_descriptor: string;

            /**
             * The several states the PaymentIntent goes through until it it either canceled or succeeds.
             */
            status: PaymentIntentStatus;

            /**
             * The data with which to automatically create a Transfer when the payment is finalized.
             */
            transfer_data: {
                /**
                 * The account (if any) the payment will be attributed to for tax reporting,
                 * and where funds from the payment will be transferred to upon payment success.
                 */
                destination: string;
            };

            /**
             * A string that identifies the resulting payment as part of a group.
             */
            transfer_group: string;
        }

        interface Charge {
            /**
             * Unique identifier for the object.
             */
            id: string;

            /**
             * Value is 'charge'
             */
            object: "charge";

            /**
             * Amount charged in cents/pence, positive integer or zero.
             */
            amount: number;

            /**
             * Amount in cents/pence refunded (can be less than the amount attribute on the
             * charge if a partial refund was issued), positive integer or zero.
             */
            amount_refunded: number;

            /**
             * ID of the Connect application that created the charge.
             */
            application: string;

            /**
             * The application fee (if any) for the charge. See the Connect documentation
             * for details.
             */
            application_fee: string;

            /**
             * The amount of the application fee (if any) for the charge. See the Connect
             * documentation for details.
             */
            application_fee_amount: number;

            /**
             * ID of the balance transaction that describes the impact of this charge on
             * your account balance (not including refunds or disputes).
             */
            balance_transaction: string;

            /**
             * Billing information associated with the payment method at the time of the transaction.
             */
            billing_details: BillingDetails;

            /**
             * If the charge was created without capturing, this boolean represents whether or not it is
             * still uncaptured or has since been captured.
             */
            captured: boolean;

            /**
             * Time at which the object was created. Measured in seconds since the Unix epoch.
             */
            created: number;

            /**
             * Three-letter ISO currency code representing the currency in which the
             * charge was made.
             */
            currency: string;

            /**
             * ID of the customer this charge is for if one exists.
             */
            customer: string;

            /**
             * An arbitrary string attached to the object. Often useful for displaying to users.
             */
            description: string;

            /**
             * Details about the dispute if the charge has been disputed.
             */
            dispute: string;

            /**
             * Error code explaining reason for charge failure if available (see the errors section for a list of
             * codes: https://stripe.com/docs/api#errors).
             */
            failure_code: string;

            /**
             * Message to user further explaining reason for charge failure if available.
             */
            failure_message: string;

            /**
             * Hash with information on fraud assessments for the charge.
             */
            fraud_details: {
                /**
                 * Assessments reported by you have the key user_report and, if set, possible values of "safe" and "fraudulent".
                 */
                user_report?: "fraudulent" | "safe";

                /**
                 * Assessments from Stripe have the key stripe_report and, if set, the value "fraudulent".
                 */
                stripe_report?: "fraudulent";
            };

            /**
             * ID of the invoice this charge is for if one exists. [Expandable]
             */
            invoice: string;

            /**
             * Has the value true if the object exists in live mode or the value false if
             * the object exists in test mode.
             */
            livemode: boolean;

            metadata: Metadata;

            /**
             * The Stripe account ID for which these funds are intended. Automatically
             * set if you use the destination parameter. For details, see [Creating
             * Separate Charges and Transfers]
             * <https://stripe.com/docs/connect/charges-transfers#on-behalf-of>.
             */
            on_behalf_of: string;

            /**
             * ID of the order this charge is for if one exists.
             */
            order: string;

            /**
             * Details about whether the payment was accepted, and why. See
             * understanding declines for details.
             */
            outcome: {
                network_status: 'approved_by_network' | 'declined_by_network' | 'not_sent_to_network' | 'reversed_after_approval';
                reason: 'highest_risk_level' | 'elevated_risk_level' | 'rule';
                risk_level: 'normal' | 'elevated' | 'highest' | 'not_assessed' | 'unknown';
                risk_score: number;
                rule?: string;
                seller_message: string;
                type: 'authorized' | 'manual_review' | 'issuer_declined' | 'blocked' | 'invalid';
            };

            /**
             * true if the charge succeeded, or was successfully authorized for later capture.
             */
            paid: boolean;

            /**
             * ID of the PaymentIntent associated with this charge, if one exists.
             */
            payment_intent: string;

            /**
             * ID of the payment method used in this charge.
             */
            payment_method: string;

            payment_method_details: paymentMethod.PaymentMethodDetails;

            /**
             * This is the email address that the receipt for this charge was sent to.
             */
            receipt_email: string;

            /**
             * This is the transaction number that appears on email receipts sent for this charge.
             */
            receipt_number: string;

            /**
             * This is the URL to view the receipt for this charge. The receipt is kept up-to-date to the
             * latest state of the charge, including any refunds. If the charge is for an Invoice, the
             * receipt will be stylized as an Invoice receipt.
             */
            receipt_url: string;

            /**
             * Whether or not the charge has been fully refunded. If the charge is only partially refunded,
             * this attribute will still be false.
             */
            refunded: boolean;

            /**
             * A list of refunds that have been applied to the charge.
             */
            refunds: List<Refund>;

            /**
             * ID of the review associated with this charge if one exists.
             */
            review?: string;

            /**
             * Shipping information for the charge.
             */
            shipping?: ShippingDetails;

            /**
             * For most Stripe users, the source of every charge is a credit or debit card.
             * This hash is then the card object describing that card.
             */
            source?: Source;

            /**
             * The transfer ID which created this charge. Only present if the charge came
             * from another Stripe account. See the Connect documentation for details.
             */
            source_transfer: string;

            /**
             * Extra information about a charge. This will appear on your customer’s
             * credit card statement.
             */
            statement_descriptor: string;

            /**
             * The status of the payment is either "succeeded", "pending", or "failed".
             */
            status: "succeeded" | "pending" | "failed";

            /**
             * ID of the transfer to the destination account (only applicable if the
             * charge was created using the destination parameter).
             */
            transfer?: string;

            /**
             * A string that identifies this transaction as part of a group.
             * See the Connect documentation for details.
             */
            transfer_group?: string;
        }

        interface Refund {
            /**
             * Unique identifier for the object.
             */
            id: string;

            /**
             * Value is "refund"
             */
            object: 'refund';

            /**
             * Refund amount, in cents.
             */
            amount: number;

            /**
             * Balance transaction that describes the impact on your account balance.
             */
            balance_transaction: string ;

            /**
             * ID of the charge that was refunded.
             */
            charge: string;

            /**
             * Time at which the object was created. Measured in seconds since the Unix epoch.
             */
            created: number;

            /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             */
            currency: string;

            /**
             * An arbitrary string attached to the object. Often useful for
             * displaying to users. (Available on non-card refunds only)
             */
            description?: string;

            /**
             * If the refund failed, this balance transaction describes the
             * adjustment made on your account balance that reverses the
             * initial balance transaction.
             */
            failure_balance_transaction?: string;

            /**
             * If the refund failed, the reason for refund failure if known
             */
            failure_reason?: 'lost_or_stolen_card'
                | 'expired_or_canceled_card'
                | 'unknown';

            metadata: Metadata;

            /**
             * Reason for the refund
             */
            reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' ;

            /**
             * This is the transaction number that appears on email
             * receipts sent for this refund.
             */
            receipt_number: string ;

            /**
             * The transfer reversal that is associated with the refund.
             * Only present if the charge came from another Stripe account.
             * See the Connect documentation for details.
             */
            source_transfer_reversal: string ;

            /**
             * Status of the refund. For credit card refunds, this can be
             * pending, succeeded, or failed. For other types of refunds,
             * it can be pending, succeeded, failed, or canceled. Refer to
             * our refunds documentation for more details.
             */
            status: 'pending' | 'succeeded' | 'failed' | 'canceled';

            /**
             * If the accompanying transfer was reversed, the transfer reversal object.
             * Only applicable if the charge was created using the destination parameter.
             */
            transfer_reversal: string ;
        }



    }   // end namespace paymentIntents







    namespace paymentMethod {
        type paymentMethodType = 'card' | 'card_present';

        interface PaymentMethod {
            /**
             * The unique identifier for the object
             */
            id: string;

            /**
             * Value is "payment_method"
             */
            object: 'payment_method';

            /**
             * Billing information associated with the PaymentMethod that may be
             * used or required by particular types of payment methods.
             */
            billing_details: BillingDetails;

            /**
             * If this is a card PaymentMethod, this hash contains details about the card.
             */
            card?: PaymentMethodCard;

            /**
             * If this is an card_present PaymentMethod, this hash contains details
             * about the Card Present payment method.
             */
            card_present?: any;

            /**
             * Time at which the object was created. Measured in seconds since the
             * Unix epoch.
             */
            created: number;

            /**
             * The ID of the Customer to which this PaymentMethod is saved.
             * This will not be set when the PaymentMethod has not been saved to a Customer.
             */
            customer: string;

            /**
             * Has the value true if the object exists in live mode or the value
             * false if the object exists in test mode.
             */
            livemode: boolean;

            metadata: Metadata;

            /**
             * The type of the PaymentMethod. An additional hash is included on the
             * PaymentMethod with a name matching this value. It contains additional
             * information specific to the PaymentMethod type.
             */
            type: string;
        }

        type paymentMethodCardBrand = 'amex'
            | 'diners'
            | 'discover'
            | 'jcb'
            | 'mastercard'
            | 'unionpay'
            | 'visa'
            | 'unknown';


        interface PaymentMethodCard {
            /**
             * Card brand
             */
            brand: paymentMethodCardBrand;

            /**
             * Checks on Card address and CVC if provided.
             */
            checks: {
                address_line1_check: boolean ;
                address_postal_code_check: boolean ;
                cvc_check: boolean ;
            };

            /**
             * Two-letter ISO code representing the country of the card. You
             * could use this attribute to get a sense of the international
             * breakdown of cards you’ve collected.
             */
            country: string;

            /**
             * Two-digit number representing the card’s expiration month.
             */
            exp_month: number;

            /**
             * Four-digit number representing the card’s expiration year.
             */
            exp_year: number;

            /**
             * Uniquely identifies this particular card number. You can use
             * this attribute to check whether two customers who’ve signed
             * up with you are using the same card number, for example.
             */
            fingerprint: string;

            /**
             * Card funding type
             */
            funding: fundingType;

            /**
             * Details of the original PaymentMethod that created this object.
             */
            generated_from: {
                charge?: string ;
                payment_method_details?: PaymentMethodDetails ;
            };

            /**
             * The last four digits of the card.
             */
            last4: string;

            /**
             * Contains details on how this Card maybe be used for 3D Secure authentication.
             */
            three_d_secure_usage?: {
                supported?: boolean;
            };

            /**
             * If this Card is part of a card wallet, this contains the details of
             * the card wallet.
             */
            wallet: {
                type: 'amex_express_checkout'
                    | 'apple_pay'
                    | 'google_pay'
                    | 'masterpass'
                    | 'samsung_pay'
                    | 'visa_checkout';
                amex_express_checkout?: any;
                apple_pay?: any;
                dynamic_last4?: any;
                google_pay?: any;
                masterpass?: any;
                samsung_pay?: any;
                visa_checkout?: any;
            } ;
        }

        /**
         * Details about the payment method at the time of the transaction.
         */
        interface PaymentMethodDetails {
            /**
             * The type of transaction-specific details of the payment method used in the payment
             */
            type: 'ach_credit_transfer'
                | 'ach_debit'
                | 'alipay'
                | 'bancontact'
                | 'card'
                | 'eps'
                | 'giropay'
                | 'ideal'
                | 'multibanco'
                | 'p24'
                | 'sepa_debit'
                | 'sofort'
                | 'stripe_account'
                | 'wechat';

            ach_credit_transfer?: AchCreditTransferDetails ;
            ach_debit?: AchDebitDetails ;
            alipay?: any ;
            bancontact?: BanContactDetails ;
            card?: PaymentMethodCard ;
            eps?: EpsDetails ;
            giropay?: GiropayDetails ;
            ideal?: IdealDetails ;
            multibanco?: MultibancoDetails ;
            p24?: P24Details ;
            sepa_debit?: SepaDebitDetails ;
            sofort?: SofortDetails ;
            stripe_account?: any ;
            wechat?: any ;
        }

        interface AchCreditTransferDetails {
            account_number: string;
            bank_name: string;
            routing_number: string;
            swift_coode: string;
        }

        interface AchDebitDetails {
            account_holder_type: 'individual' | 'company';
            bank_name: string;
            country: string;
            fingerprint: string;
            last4: string;
            routing_number: string;
        }

        interface BanContactDetails {
            bank_code: string;
            bank_name: string;
            bic: string;
            iban_last4: string;
            preferred_language: 'en' | 'de' | 'fr' | 'nl';
            verified_name: string;
        }

        interface EpsDetails {
            verified_name: string;
        }

        interface GiropayDetails {
            bank_code: string;
            bank_name: string;
            bic: string;
            verified_name: string;
        }

        interface IdealDetails {
            bank: 'abn_amro'
                | 'asn_bank'
                | 'bunq'
                | 'handelsbanken'
                | 'ing'
                | 'knab'
                | 'moneyou'
                | 'rabobank'
                | 'regiobank'
                | 'sns_bank'
                | 'triodos_bank'
                | 'van_lanschot';

            bic: string;
            iban_last4: string;
            verified_name: string;
        }

        interface MultibancoDetails {
            entity: string;
            reference: string;
        }

        interface P24Details {
            reference: string;
            verified_name: string;
        }

        interface SepaDebitDetails {
            bank_code: string;
            branch_code: string;
            country: string;
            fingerprint: string;
            last4: string;
        }

        interface SofortDetails {
            bank_code: string;
            bank_name: string;
            bic: string;
            country: string;
            iban_last4: string;
            verified_name: string;
        }



    }   // end namespace paymentMethod





}
